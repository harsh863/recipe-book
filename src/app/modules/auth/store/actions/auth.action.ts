import {AuthStoreAction} from '../../models/auth-store-action.model';
import {AuthStoreActions} from '../../enums/auth-store-actions.enum';
import {UserModel} from '../../../shared/models/user.model';

export const loginStarted = (email: string, password: string): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN_START, payload: { email, password }});

export const login = (user: UserModel): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN, payload: { user }});

export const loginFailed = (message: string): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGIN_FAILED, payload: { message }});

export const signUpStarted = (email: string, password: string, username: string): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP_START, payload: { email, password, username }});

export const signUp = (user: UserModel): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP, payload: { user }});

export const signUpFailed = (message: string): AuthStoreAction =>
  ({ type: AuthStoreActions.SIGNUP_FAILED, payload: { message }});

export const clearFailedRequests = (): AuthStoreAction =>
  ({ type: AuthStoreActions.CLEAR_FAILED_REQUESTS })

export const googleAuthenticationStarted = (): AuthStoreAction =>
  ({ type: AuthStoreActions.AUTHENTICATE_WITH_GOOGLE });

export const logout = (): AuthStoreAction =>
  ({ type: AuthStoreActions.LOGOUT });
