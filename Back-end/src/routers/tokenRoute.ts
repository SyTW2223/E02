import Router from "koa-router";
import { verifyToken } from "../middleware/jwt";

const tokenRouter = new Router();

tokenRouter.get("/token", verifyToken, async (ctx) => {
  ctx.body = {error: "", res: 200}
  ctx.status = 200;
});

export default tokenRouter;