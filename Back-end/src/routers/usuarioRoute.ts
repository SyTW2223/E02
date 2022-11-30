import Router from "koa-router";

import UsuarioDataModel from "../DataBaseModels/UsuarioData/usuarioDataModel";

const usuarioRouter = new Router();

usuarioRouter.get('/usuario', async (ctx) => {
	
	const dataModel = new UsuarioDataModel();
	const {usuario, res, error} = await dataModel.get(ctx.query);
  ctx.body = {usuario, res, error};
	return ctx.body;
});

usuarioRouter.post('/usuarioRegister', async (ctx) => {
	
	const dataModel = new UsuarioDataModel();
	const {error, res, token} = await dataModel.postRegister(ctx.request);
  ctx.body = {error, res, token};
	return ctx.body;
});

usuarioRouter.post('/usuarioLogin', async (ctx) => {

	const dataModel = new UsuarioDataModel();
	const {usuario, error, res, token} = await dataModel.postLogin(ctx.request);
  ctx.body = {usuario, error, res, token};
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