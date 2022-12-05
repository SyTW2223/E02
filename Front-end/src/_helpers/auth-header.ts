export function authHeader() {
  // return authorization header with jwt token
  let user: any = JSON.parse(localStorage.getItem('user') as string);

  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return '';
  }
}