export const userService = {
  login,
  logout,
  register
};

export async function login(correo: any, password: any) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password })
    };
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioLogin', requestOptions);
    const user = await response.json();
    // store user and jwt token in a single object in local storage only if the login was successful
    if (user && user.token) {
      // remove res and error properties from user object
      delete user.error;
    }
    return user;
  } catch (error) {
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}

export function logout() {
  try {
    // remove user from local storage to log user out
    localStorage.removeItem('usuario');
  }
  catch (error) {
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}


export async function register(nombre: string, apellidos: string, correo: string, password: string) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellidos, correo, password })
    };
    const direccion = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + '/usuarioRegister', requestOptions);
    const user = await response.json();
    // store user and jwt token in a single object in local storage only if the login was successful
    if (user && user.token) {
      // remove error properties from user object
      delete user.error;
    }
    return user;
  } catch (error) {
    // return error to indicate that the login was not successful
    return Promise.reject(error);
  }
}
