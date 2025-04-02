
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";


const authMiddleware = createMiddleware<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  },
  Variables:{
    userId:any
  }
}>(async (c, next) => {
  const header = c.req.header("Authorization") || " ";
  const token = header.split(" ")[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId",user.id)
      await next();
    }
  } catch (error) {
    c.status(403)
    return c.json({
      error: "you are not logged in!!",
    });
  }
})
export default authMiddleware