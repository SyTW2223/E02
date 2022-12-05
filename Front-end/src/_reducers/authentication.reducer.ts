import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('usuario') as string);
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: any) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
      case userConstants.REGISTER_REQUEST:
        return {
          loggingIn: true,
          user: action.user
        };
      case userConstants.REGISTER_SUCCESS:
        return {
          loggedIn: true,
          user: action.user
        };
      case userConstants.REGISTER_FAILURE:
        return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}