import Router from "koa-router";

import CarteraDataModel from "../DataBaseModels/UsuarioData/carteraDataModel";

const carteraRouter = new Router();

carteraRouter.get('/cartera', async (ctx) => {
	
	const dataModel = new CarteraDataModel();
	const {cartera, res, error} = await dataModel.get(ctx.query);
  ctx.body = {cartera, res, error};
	return ctx.body;
});

carteraRouter.post('/cartera', async (ctx) => {
		
	const dataModel = new CarteraDataModel();
	const {error, res} = await dataModel.post(ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

carteraRouter.delete('/cartera', async (ctx) => {
		
	const dataModel = new CarteraDataModel();
	const {error, res} = await dataModel.delete(ctx.query);
  ctx.body = {error, res};
	return ctx.body;
});

carteraRouter.patch('/cartera', async (ctx) => {
		
	const dataModel = new CarteraDataModel();
	const {error, res} = await dataModel.patch(ctx.query, ctx.request);
  ctx.body = {error, res};
	return ctx.body;
});

export default carteraRouter;