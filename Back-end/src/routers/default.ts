import Router from "koa-router";
import PanDataModel from "../DataBaseModels/PanData/panDataModel";

const defaultRouter = new Router();

defaultRouter.get('/hol', async (ctx) => {
	ctx.status = 200;
	
	const a = new PanDataModel();
	const {hola} = await a.get("pepe");
	return ctx.body = hola;
});

export default defaultRouter;