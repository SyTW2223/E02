import Router from "koa-router";

const defaultRouter = new Router();

defaultRouter.get('/hol', (ctx) => {
	ctx.status = 200;
	ctx.body = "ok";
});

export default defaultRouter;