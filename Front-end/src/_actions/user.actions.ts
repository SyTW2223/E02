import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';

export const userActions = {
    login,
    register,
    logout
};

function login(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username }));
    userService.login(username, password)
    .then(
      (user: any) => {
        dispatch(success(user));
        dispatch(alertActions.success('Login successful'));
        window.location.href = '/';
      },
      (error: any) => {
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
  window.location.href = '/';
  return { type: userConstants.LOGOUT };
}


function register(nombre:string, apellido:string, correo: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ nombre }));

    userService.register(nombre, apellido, password, correo)
      .then(
        (user: any) => {
          dispatch(success(user));
          dispatch(alertActions.success('Register successful'));
          window.location.href = '/';
        },
        (error: any) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  }
  function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user: any) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error } }
};