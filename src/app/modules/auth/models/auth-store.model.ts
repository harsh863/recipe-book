import {UserModel} from '../../shared/models/user.model';

export interface AuthStore {
  user: UserModel;
  loggingIn: boolean;
  logInSuccess: boolean;
  logInFailed: boolean;
  signingUp: boolean;
  signUpSuccess: boolean;
  signUpFailed: boolean;
  actionErrorMessage: string;
}
