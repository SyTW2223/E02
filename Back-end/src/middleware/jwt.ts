import jwt from 'jsonwebtoken';
import {jwtSecret} from '../env/config';

export const verifyToken = async (ctx, next) => {
  const header = ctx.request.header['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        ctx.body = {res: 401, error: "Invalid token"};
      }
    })
		await next();
  } else {
    ctx.body = {res: 402, error: "No token provided"};
  }
}
