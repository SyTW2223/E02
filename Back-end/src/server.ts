import { Server } from "http";
import { AddressInfo } from "net";

import koa from "koa";
import bodyparser from "koa-bodyparser";
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import mount from "koa-mount";
import auth from "koa-basic-auth";
import defaultRouter from "./routers/default";

const app = new koa();

// response
app.use(defaultRouter.routes());

app.listen(3000);