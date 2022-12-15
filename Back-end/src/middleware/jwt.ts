import jwt from 'jsonwebtoken';
import {jwtSecret} from '../env/config';

export const verifyToken = async (ctx, next) => {
  const header = ctx.request.header['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    await jwt.verify(token, jwtSecret, async (err) => {
      if (err) {
        ctx.body = {res: 401, error: "Invalid token"};
        ctx.status = 401;
      } else {
        await next();
      }
    })

  } else {
    ctx.body = {res: 401, error: "No token provided"};
    ctx.status = 401;
  }
}
