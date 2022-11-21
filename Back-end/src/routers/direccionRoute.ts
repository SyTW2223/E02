import Router from "koa-router";

import DireccionDataModel from "../DataBaseModels/UsuarioData/direccionDataModel";

const direccionRouter = new Router();

direccionRouter.get('/direccion', async (ctx) => {
	
	const dataModel = new DireccionDataModel();
	const {direccion, res, error} = await dataModel.get(ctx.query);
  ctx.body = {direccion, res, error};
	return ctx.body;
});

direccionRouter.post('/direccion', async (ctx) => {
		
	const dataModel = new DireccionDataModel();
	const {error, res} = await dataModel.post(ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

direccionRouter.delete('/direccion', async (ctx) => {
		
	const dataModel = new DireccionDataModel();
	const {error, res} = await dataModel.delete(ctx.query);
  ctx.body = {error, res};
	return ctx.body;
});

direccionRouter.patch('/direccion', async (ctx) => {
		
	const dataModel = new DireccionDataModel();
	const {error, res} = await dataModel.patch(ctx.query, ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

export default direccionRouter;