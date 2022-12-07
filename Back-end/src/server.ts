import './db/mongoose';

import { Server } from "http";
import { AddressInfo } from "net";
import {port} from './env/config';
import app from './app'

app.listen(port);