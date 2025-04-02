import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from "../middleware/authMiddleware";
import { blogCreateInput, blogUpdateInput } from '../../common/index'

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: any;
  };
}>();

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          role: true,
          bio: true,
        },
      },
      tags: {
        select: { tag: true },
      },
    },
  });
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id:true,
        title:true,
        description:true,
        content:true,
        created_at:true,
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            bio: true,
          },
        },
        tags: {
          select: { tag: true },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(404);
    return c.json({
      error: "blog not found",
    });
  }
});

blogRouter.use(authMiddleware);

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = blogCreateInput.safeParse(body);
  if (!success) {
    return c.json({
      error: "Invalid Inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.blog.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        authorId: c.get("userId"),
        tags: {
          connectOrCreate: body.tags.map((tag: string) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
    });
    return c.json({
      msg: "blog created",
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "failed!! blog not created something went wrong",
    });
  }
});
blogRouter.put("/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const { success } = blogUpdateInput.safeParse(body);
  if (!success) {
    return c.json({
      error: "Invalid Inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
        description: body.description,
        tags: {
          connectOrCreate: body.tags.map((tag: string) => ({
            where: { tag },
            create: { tag },
          })),
        },
      },
    });
    return c.json({
      msg: "blog updated",
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "failed!! blog not updated something went wrong",
    });
  }
});

blogRouter.delete("/:id", authMiddleware, async (c) => {
  const { id } = c.req.param();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.blog.delete({
      where: {
        id: id,
        authorId: c.get("userId"),
      },
    });
    return c.json({
      msg: "blog deleted",
    });
  } catch (e) {
    c.status(404);
    return c.json({
      error: "failed to delete blog post",
    });
  }
});


export default blogRouter;
