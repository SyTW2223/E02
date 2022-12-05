import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    login,
    register,
    logout
};

function login(username: string, password: string) {
  console.log('login action', username, password)
  return (dispatch: any) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (user: any) => {
          dispatch(success(user));
          console.log('login success', user)
          history.push('/');
        },
        (error: any) => {
          console.log('login error', error)
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}


function register(nombre:string, apellido:string, correo: string, password: string) {
  console.log('registro action', nombre, apellido, correo, password)
  return (dispatch: any) => {
    dispatch(request({ nombre }));

    userService.register(nombre, apellido, password, correo)
      .then(
        (user: any) => {
          dispatch(success(user));
          console.log('registro success', user)
          history.push('/');
        },
        (error: any) => {
          console.log('registro error', error)
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  }
  function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user: any) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error } }
};