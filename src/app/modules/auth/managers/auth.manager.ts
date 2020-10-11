import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {googleAuthenticationStarted, startLogin, logout, startSignUp} from '../store/actions/auth.action';
import {catchError, map} from 'rxjs/operators';
import {from, Observable, Subject} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthManager {
  constructor(private _store: Store<AppState>,
              private _authService: AuthService) {
  }

  login(email: string, password: string) {
    this._store.dispatch(startLogin(email, password));
  }

  signUp(email: string, password: string, username) {
    this._store.dispatch(startSignUp(email, password, username));
  }

  authenticateWithGoogle() {
    this._store.dispatch(googleAuthenticationStarted());
  }

  logout() {
    this._store.dispatch(logout());
  }

  selectLoginState(state: 'loggingIn' | 'logInSuccess' | 'logInFailed'): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => authState.actionStates[state]))
  }

  selectSignUpState(state: 'signingUp' | 'signUpSuccess' | 'signUpFailed'): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => authState.actionStates[state]));
  }

  getErrorMessage(): Observable<string> {
    return this._store.select('auth').pipe(map(authState => authState.actionStates.actionErrorMessage));
  }

  isUserLoggedIn(): Observable<boolean> {
    const $isLoggedIn = new Subject<boolean>();
    this._authService.selectLoggedInUser().subscribe(user => {
      $isLoggedIn.next(!!user);
    }, _ => {
      setTimeout(_ => console.clear(), 1000);
    });
    return $isLoggedIn;
  }
}
