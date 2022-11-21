import { Server } from "http";
import { AddressInfo } from "net";

import koa from "koa";
import bodyparser from "koa-bodyparser";
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import mount from "koa-mount";
import auth from "koa-basic-auth";
import carteraRouter from "./routers/carteraRoute";

const app = new koa();

// response

app.use(bodyparser());
app.use(carteraRouter.routes());
app.use(carteraRouter.allowedMethods())


app.listen(3000);