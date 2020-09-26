import {AuthStore} from '../../models/auth-store.model';
import {AuthStoreAction} from '../../models/auth-store-action.model';
import {AuthStoreActions} from '../../enums/auth-store-actions.enum';
import {UserModel} from '../../../shared/models/user.model';

export function authReducer(state: AuthStore = getAuthStoreInitialState(), action: AuthStoreAction): AuthStore {

  switch (action.type) {
    case AuthStoreActions.LOGIN_START || AuthStoreActions.AUTHENTICATE_WITH_GOOGLE: return startLogin(state);
    case AuthStoreActions.LOGIN: return login(state, action.payload);
    case AuthStoreActions.LOGIN_FAILED: return loginFailed(state, action.payload);
    case AuthStoreActions.SIGNUP_START: return startSignUp(state);
    case AuthStoreActions.SIGNUP: return signUp(state);
    case AuthStoreActions.SIGNUP_FAILED: return signUpFailed(state, action.payload);
    case AuthStoreActions.CLEAR_ACTION_STATES: return clearActionStates(state);
    case AuthStoreActions.FETCH_LOGGED_IN_USER: return getLoggedInUser(state);
    case AuthStoreActions.SAVE_USER: return saveUser(state, action.payload);
    case AuthStoreActions.LOGOUT: return getAuthStoreInitialState();
    default: return state;
  }
}

const startLogin = (state: AuthStore): AuthStore =>
  ({
    ...state,
    loggedInUser: { ...state.loggedInUser, isLoading: true, isLoaded: false },
    actionStates: { ...state.actionStates, loggingIn: true, logInSuccess: false, logInFailed: false, actionErrorMessage: null }
  });

const login = (state: AuthStore, data: {user: UserModel}): AuthStore =>
  ({
    ...state,
    loggedInUser: { user: data.user, isLoaded: true, isLoading: false },
    actionStates: { ...state.actionStates , loggingIn: false, logInSuccess: true, logInFailed: false}
  });

const loginFailed = (state: AuthStore, data: {message: string}): AuthStore =>
  ({
    ...state,
    loggedInUser: { ...state.loggedInUser, isLoaded: false, isLoading: false },
    actionStates: { ...state.actionStates, loggingIn: false, logInFailed: true, logInSuccess: false, actionErrorMessage: data.message }
  });

const startSignUp = (state: AuthStore): AuthStore =>
  ({
    ...state,
    actionStates: { ...state.actionStates, signingUp: true, signUpSuccess: false, signUpFailed: false, actionErrorMessage: null }
  });

const signUp = (state: AuthStore): AuthStore =>
  ({
    ...state,
    actionStates: { ...state.actionStates, signingUp: false, signUpSuccess: true, signUpFailed: false }
  });

const signUpFailed = (state: AuthStore, data: {message: string}): AuthStore =>
  ({
    ...state,
    actionStates: { ...state.actionStates, signingUp: false, signUpFailed: true, signUpSuccess: false, actionErrorMessage: data.message }
  });

const clearActionStates = (state: AuthStore): AuthStore =>
  ({
    ...state,
    actionStates: getInitialActionStates()
  });

const getLoggedInUser = (state: AuthStore): AuthStore =>
  ({
    ...state,
    loggedInUser: {...state.loggedInUser, isLoading: true}
  })

const saveUser = (state: AuthStore, data: {user: UserModel}): AuthStore =>
  ({
    ...state,
    loggedInUser: { user: data.user, isLoaded: true, isLoading: false }
  });


const getAuthStoreInitialState = (): AuthStore =>
  ({
    loggedInUser: { user: null, isLoaded: false, isLoading: false },
    actionStates: getInitialActionStates()
  });

const getInitialActionStates = () =>
  ({
    loggingIn: false,
    logInSuccess: false,
    logInFailed: false,
    signingUp: false,
    signUpSuccess: false,
    signUpFailed: false,
    actionErrorMessage: null
  });
