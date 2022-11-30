import { Server } from "http";
import { AddressInfo } from "net";

import './db/mongoose';
import {port} from './env/config';

import koa from "koa";
import bodyparser from "koa-bodyparser";
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import mount from "koa-mount";
import auth from "koa-basic-auth";
import carteraRouter from "./routers/carteraRoute";
import direccionRouter from "./routers/direccionRoute";
import usuarioRouter from "./routers/usuarioRoute";
import panRouter from "./routers/panRoute";

const app = new koa();

// response
app.use(bodyparser()).
    use(loggerKoa()).
    use(cors()).
    use(carteraRouter.routes()).
    use(direccionRouter.routes()).
    use(usuarioRouter.routes()).
    use(panRouter.routes());

app.listen(port);