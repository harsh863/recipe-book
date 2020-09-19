import {UserModel} from '../../shared/models/user.model';

export interface AuthStore {
  loggedInUser: {
    user: UserModel,
    isLoading: boolean;
    isLoaded: boolean;
  }
  actionStates: {
    loggingIn: boolean;
    logInSuccess: boolean;
    logInFailed: boolean;
    signingUp: boolean;
    signUpSuccess: boolean;
    signUpFailed: boolean;
    actionErrorMessage: string;
  };
}
