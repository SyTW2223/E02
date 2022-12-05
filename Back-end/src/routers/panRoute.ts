import Router from "koa-router";
import { verifyToken } from "../middleware/jwt";

import PanDataModel from "../Controllers/PanData/panDataModel";

const panRouter = new Router();

panRouter.get("/pan", verifyToken, async (ctx) => {
  const dataModel = new PanDataModel();
  const { pan, res, error } = await dataModel.get(ctx.query);
  ctx.body = { pan, res, error };
  ctx.status = res;
});

panRouter.post("/pan", verifyToken, async (ctx) => {
  const dataModel = new PanDataModel();
  const { error, res } = await dataModel.post(ctx.request);
  ctx.body = { error, res };
  ctx.status = res;
});

panRouter.delete("/pan", verifyToken, async (ctx) => {
  const dataModel = new PanDataModel();
  const { error, res } = await dataModel.delete(ctx.query);
  ctx.body = { error, res };
  ctx.status = res;
});

panRouter.patch("/pan", verifyToken, async (ctx) => {
  const dataModel = new PanDataModel();
  const { error, res } = await dataModel.patch(ctx.query, ctx.request);
  ctx.body = { error, res };
  ctx.status = res;
});

export default panRouter;
