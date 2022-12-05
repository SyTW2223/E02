import Router from "koa-router";
import { verifyToken } from "../middleware/jwt";

import UsuarioDataModel from "../Controllers/UsuarioData/usuarioDataModel";

const usuarioRouter = new Router();

usuarioRouter.get("/usuario", verifyToken, async (ctx) => {
  const dataModel = new UsuarioDataModel();
  const { usuario, res, error } = await dataModel.get(ctx.query);
  ctx.body = { usuario, res, error };
  return ctx.body;
});

usuarioRouter.post("/usuarioRegister", async (ctx) => {
  const dataModel = new UsuarioDataModel();
  const { error, res, token } = await dataModel.postRegister(ctx.request);
  ctx.body = { error, res, token };
  return ctx.body;
});

usuarioRouter.post("/usuarioLogin", async (ctx) => {
  const dataModel = new UsuarioDataModel();
  const { usuario, error, res, token } = await dataModel.postLogin(ctx.request);
  ctx.body = { usuario, error, res, token };
  return ctx.body;
});

usuarioRouter.delete("/usuario", verifyToken, async (ctx) => {
  const dataModel = new UsuarioDataModel();
  const { error, res } = await dataModel.delete(ctx.query);
  ctx.body = { error, res };
  return ctx.body;
});

usuarioRouter.patch("/usuario", verifyToken, async (ctx) => {
  const dataModel = new UsuarioDataModel();
  const { error, res } = await dataModel.patch(ctx.query, ctx.request);
  ctx.body = { error, res };
  return ctx.body;
});

export default usuarioRouter;
