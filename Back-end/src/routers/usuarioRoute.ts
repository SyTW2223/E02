import Router from "koa-router";

import UsuarioDataModel from "../DataBaseModels/UsuarioData/usuarioDataModel";

const usuarioRouter = new Router();

usuarioRouter.get('/usuario', async (ctx) => {
	
	const dataModel = new UsuarioDataModel();
	const {usuario, res, error} = await dataModel.get(ctx.query);
  ctx.body = {usuario, res, error};
	return ctx.body;
});

usuarioRouter.post('/usuario', async (ctx) => {
		
	const dataModel = new UsuarioDataModel();
	const {error, res} = await dataModel.post(ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

usuarioRouter.delete('/usuario', async (ctx) => {
		
	const dataModel = new UsuarioDataModel();
	const {error, res} = await dataModel.delete(ctx.query);
  ctx.body = {error, res};
	return ctx.body;
});

usuarioRouter.patch('/usuario', async (ctx) => {
		
	const dataModel = new UsuarioDataModel();
	const {error, res} = await dataModel.patch(ctx.query, ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

export default usuarioRouter;