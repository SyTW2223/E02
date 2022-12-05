import jwt from 'jsonwebtoken';

export const verifyToken = (ctx, next) => {
  const header = ctx.request.headers['authorization'];
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    ctx.state.user = jwt.verify(token, process.env.JWT_SECRET), (err, authData) => {
      if (err) {
        return ctx.body = {res: 401, error: "Invalid token"};
      };
      next();
    }
  } else {
    return ctx.body = {res: 402, error: "No token provided"};
  }
}
