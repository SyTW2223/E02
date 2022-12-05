import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout
};

function login(username: any, password: any) {
  return (dispatch: any) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (user: any) => {
          dispatch(success(user));
          history.push('/');
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
  return { type: userConstants.LOGOUT };
}