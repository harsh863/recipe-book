import {AuthStoreAction} from '../../models/auth-store-action.model';
import {AuthStoreActions} from '../../enums/auth-store-actions.enum';
import {UserModel} from '../../../shared/models/user.model';

export const startLogin = (email: string, password: string): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN_START, payload: { email, password }});

export const login = (user: UserModel): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN, payload: { user }});

export const loginFailed = (message: string): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN_FAILED, payload: { message }});

export const startSignUp = (email: string, password: string, username: string): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP_START, payload: { email, password, username }});

export const signUp = (): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP });

export const signUpFailed = (message: string): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP_FAILED, payload: { message }});

export const clearActionStates = (): AuthStoreAction =>
  ({ type: AuthStoreActions.CLEAR_ACTION_STATES })

export const googleAuthenticationStarted = (): AuthStoreAction =>
  ({ type: AuthStoreActions.AUTHENTICATE_WITH_GOOGLE });

export const logout = (): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGOUT });

export const fetchLoggedInUser = (): AuthStoreAction => {
  return  {type: AuthStoreActions.FETCH_LOGGED_IN_USER};
}

export const saveUser = (user: UserModel): AuthStoreAction =>
  ({ type: AuthStoreActions.SAVE_USER, payload: { user } });
