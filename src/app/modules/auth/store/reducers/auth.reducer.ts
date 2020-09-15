import {AuthStore} from '../../models/auth-store.model';
import {AuthStoreAction} from '../../models/auth-store-action.model';
import {AuthStoreActions} from '../../enums/auth-store-actions.enum';
import {UserModel} from '../../../shared/models/user.model';

export const authReducer = (
  state: AuthStore = getAuthStoreInitialState(),
  action: AuthStoreAction): AuthStore => {

  switch (action.type) {
    case AuthStoreActions.LOGIN_START || AuthStoreActions.AUTHENTICATE_WITH_GOOGLE: return startLogin(state);
    case AuthStoreActions.LOGIN: return login(state, action.payload);
    case AuthStoreActions.LOGIN_FAILED: return loginFailed(state, action.payload);
    case AuthStoreActions.SIGNUP_START: return startSignUp(state);
    case AuthStoreActions.SIGNUP: return signUp(state, action.payload);
    case AuthStoreActions.SIGNUP_FAILED: return signUpFailed(state, action.payload);
    case AuthStoreActions.CLEAR_FAILED_REQUESTS: return clearActionsFailedState(state);
    case AuthStoreActions.LOGOUT: return getAuthStoreInitialState();
    default: return state;
  }
}

export const startLogin = (state: AuthStore): AuthStore =>
  ({ ...state, loggingIn: true, logInSuccess: false, logInFailed: false, actionErrorMessage: null});

export const login = (state: AuthStore, data: {user: UserModel}): AuthStore =>
  ({ ...state, user: data.user, loggingIn: false, logInSuccess: true, logInFailed: false});

export const loginFailed = (state: AuthStore, data: {message: string}): AuthStore =>
  ({ ...state, loggingIn: false, logInFailed: true, logInSuccess: false, actionErrorMessage: data.message});

export const startSignUp = (state: AuthStore): AuthStore =>
  ({ ...state, signingUp: true, signUpSuccess: false, signUpFailed: false, actionErrorMessage: null});

export const signUp = (state: AuthStore, data: {user: UserModel}): AuthStore =>
  ({ ...state, user: data.user, signingUp: false, signUpSuccess: true, signUpFailed: false});

export const signUpFailed = (state: AuthStore, data: {message: string}): AuthStore =>
  ({ ...state, signingUp: false, signUpFailed: true, signUpSuccess: false, actionErrorMessage: data.message});

export const clearActionsFailedState = (state: AuthStore): AuthStore =>
  ({ ...state, signUpFailed: false, signUpSuccess: false, logInFailed: false, logInSuccess: false, actionErrorMessage: null});

export const getAuthStoreInitialState = (): AuthStore =>
  ({
    user: null,
    loggingIn: false,
    logInSuccess: false,
    logInFailed: false,
    signingUp: false,
    signUpSuccess: false,
    signUpFailed: false,
    actionErrorMessage: null
  });
