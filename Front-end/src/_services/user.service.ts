import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register
};

async function login(correo: any, password: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  };
  console.log(requestOptions)
  const direccion: string = process.env.VITE_BACK_HOST || `http://localhost:3000`;
  console.log(direccion)
  const response = await fetch(direccion + "/usuarioLogin", requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('usuario', JSON.stringify(user));
  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('usuario');
}


async function register(nombre: any, apellidos: any, password: any, correo: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellidos, password, correo })
  };
  console.log(requestOptions)
  const direccion: string = process.env.VITE_BACK_HOST || `http://localhost:3000/`;
  const response = await fetch(direccion + "/usuarioRegister", requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('usuario', JSON.stringify(user));
  return user;
}

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}