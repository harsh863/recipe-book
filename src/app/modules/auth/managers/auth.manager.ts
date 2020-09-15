import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {googleAuthenticationStarted, loginStarted, logout, signUpStarted} from '../store/actions/auth.action';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class AuthManager {
  constructor(private _store: Store<AppState>) {
  }

  login(email: string, password: string) {
    this._store.dispatch(loginStarted(email, password));
  }

  selectLoginState(state: 'loggingIn' | 'logInSuccess' | 'logInFailed'): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => authState[state]))
  }

  signUp(email: string, password: string, username) {
    this._store.dispatch(signUpStarted(email, password, username));
  }

  selectSignUpState(state: 'signingUp' | 'signUpSuccess' | 'signUpFailed'): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => authState[state]));
  }

  getErrorMessage(): Observable<string> {
    return this._store.select('auth').pipe(map(authState => authState.actionErrorMessage));
  }

  authenticateWithGoogle() {
    this._store.dispatch(googleAuthenticationStarted());
  }

  logout() {
    this._store.dispatch(logout());
  }
}
