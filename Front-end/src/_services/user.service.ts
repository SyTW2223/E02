import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  register
};

async function login(correo: any, password: any) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    };
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioLogin', requestOptions);
    const user = await handleResponse(response);
    // store user and jwt token in a single object in local storage only if the login was successful
    if (user && user.token) {
      // remove res and error properties from user object
      delete user.res;
      delete user.error;
      localStorage.setItem('usuario', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    // show error message to user
    alert(error);
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}

function logout() {
  try {
    // remove user from local storage to log user out
    localStorage.removeItem('usuario');
  }
  catch (error) {
    // show error message to user
    alert(error);
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}


async function register(nombre: string, apellidos: string, password: string, correo: string) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellidos, password, correo })
    };
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioRegister', requestOptions);
    const user = await handleResponse(response);
    // store user and jwt token in a single object in local storage only if the login was successful
    if (user && user.token) {
      // remove res and error properties from user object
      delete user.res;
      delete user.error;
      localStorage.setItem('usuario', JSON.stringify(user));
    }
    return user;
  } catch (error) {
    // show error message to user
    alert(error);
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}

async function handleResponse(response: Response) {
  try {
    const text = await response.text();
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload();
      }
      if (response.status === 404 || response.status === 400) {
        // return specific error for 404 status code
        return Promise.reject('Username or password is incorrect');
      }
      if (response.status === 500) {
        // return specific error for 500 status code
        return Promise.reject('Server error');
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  } catch (error) {
    // handle error
    console.error(error);
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}
