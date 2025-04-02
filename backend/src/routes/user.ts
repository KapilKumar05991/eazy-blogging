import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {signinInput,signupInput,userUpdateInput} from '../../common/index'
import authMiddleware from "../middleware/authMiddleware";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)
  if(!success){
    return c.json({
      error: 'Invalid Inputs'
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "Email Already Exist!!",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)
  if(!success){
    return c.json({
      error: 'Invalid Inputs'
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({
        error:"Incorrect Email/Password",
      });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Invalid Credentials !!",
    });
  }
});

userRouter.get('/me',authMiddleware,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findUnique({
      where: {
        id:c.get('userId')
      },
      select:{
        id:true,
        name:true,
        email:true,
        role:true,
        bio:true
      }
    });
    if (!user) {
      c.status(404);
      return c.json({
        error: "User not Found or Invalid jwt",
      });
    }
    return c.json(user);
  } catch (e) {
    c.status(403);
    return c.json({
      error: 'something went wrong with me endpoint',
    });
  }
})
userRouter.get('/blogs',authMiddleware,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId:c.get('userId')
      },
      select:{
        id:true,
        title:true,
        description:true,
        content:true,
        created_at:true,
        tags:{
          select:{tag:true}
        }
      }
    });
    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: 'something went wrong while fetch all posts of user',
    });
  }
})

userRouter.put('/',authMiddleware, async (c) => {
  const body = await c.req.json();
  const { success } = userUpdateInput.safeParse(body)
  if(!success){
    return c.json({
      error: 'Invalid Inputs'
    })
  }
  const {name,role,bio} = body
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.update({
      where:{
        id:c.get('userId')
      },
      data: {
        ...(name && {name}),
        ...(role && {role}),
        ...(bio && {bio}),
      },
      select:{
        id:true,
        name:true,
        email:true,
        role:true,
        bio:true,
      }
    });
    return c.json({
      user: user,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "Something Went Wrong!!",
    });
  }
})

userRouter.delete('/',authMiddleware,async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.delete({
      where: {
        id:c.get('userId')
      },
    });
    if (!user) {
      c.status(411);
      return c.json({
        error: "delete failed!!",
      });
    }
    return c.json({
      msg:'Account Deleted Successfully'
    })
  } catch (e) {
    c.status(403);
    return c.json({
      msg:e,
      error: 'something went wrong with delete endpoint',
    });
  }
})

export default userRouter;
