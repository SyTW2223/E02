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
    console.log(requestOptions);
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioLogin', requestOptions);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('usuario', JSON.stringify(user));
    return user;
  } catch (error) {
    // handle error
    console.error(error);
    // show error message to user
    alert('An error occurred while loggin in. Please try again later.');
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('usuario');
}


async function register(nombre: string, apellidos: string, password: string, correo: string) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellidos, password, correo })
    };
    console.log(requestOptions);
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioRegister', requestOptions);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('usuario', JSON.stringify(user));
    return user;
  } catch (error) {
    // handle error
    console.error(error);
    // return null to indicate that the registration was not successful
    return Promise.reject(error);
  }
}

function handleResponse(response: Response) {
  try {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          location.reload();
        }
        if (response.status === 404) {
          // return specific error for 404 status code
          return Promise.reject('Username or password is incorrect');
        }
        if (response.status === 500) {
          // return specific error for 404 status code
          return Promise.reject('Error del servidor');
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  } catch (error) {
    // handle error
    console.error(error);
    // return error to indicate that the login was not successful
    return error;
  }
}
