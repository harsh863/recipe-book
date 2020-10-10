import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {UserModel} from '../../shared/models/user.model';
import {from, Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthErrorMessage} from '../../auth/enums/auth-error-message.enum';
import {AuthErrorCode} from '../../auth/enums/auth-error-code.enum';

@Injectable()
export class AuthService {

  constructor(private _angularFireAuth: AngularFireAuth) {
  }

  signUp(email: string, password: string, username: string): Observable<UserModel> {
    return from(this._angularFireAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(switchMap(res => {
        this.sendEmailVerification(res.user);
        return this.updateUserProfile(res.user, username)
            .pipe(switchMap(_ => this.parseUserInfo(this._angularFireAuth.auth.currentUser)));
        }
      ), catchError(err => from(Promise.reject({message: this.parseAuthErrors(err)}))));
  }

  googleAuth(): Observable<UserModel> {
    return from(this._angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(
        switchMap(res => from(this.parseUserInfo(res.user))),
        catchError(error => from(Promise.reject({message: this.parseAuthErrors(error)}))));
  }

  updateUserProfile(firebaseUser: User, username: string): Observable<void> {
    return from(firebaseUser.updateProfile({displayName: username}));
  }

  signIn(email: string, password: string): Observable<UserModel> {
    return from(this._angularFireAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(switchMap(res => {
        if (!res.user.emailVerified) {
          this.logout().then();
          return Promise.reject({message: AuthErrorMessage.EMAIL_NOT_VERIFIED})
        }
        return from(this.parseUserInfo(res.user));
      }), catchError(err => {
        if (err.message === AuthErrorMessage.EMAIL_NOT_VERIFIED) {
          return from(Promise.reject(err));
        }
        return from(Promise.reject({message: this.parseAuthErrors(err)}))
        }
      ));
  }

  sendPasswordResetEmail(email: string) {
    return from(this._angularFireAuth.auth.sendPasswordResetEmail(email).catch(error => Promise.reject({message: this.parseAuthErrors(error)})));
  }

  sendEmailVerification(firebaseUser: User): Observable<void> {
    return from(firebaseUser.sendEmailVerification());
  }

  selectLoggedInUser(): Observable<UserModel> {
    return this._angularFireAuth.authState.pipe(
      switchMap(value => from(this.parseUserInfo(value))),
      catchError(err => from(Promise.reject({message: this.parseAuthErrors(err)})))
    );
  }

  logout() {
    return this._angularFireAuth.auth.signOut();
  }

  async parseUserInfo(firebaseUser: User): Promise<UserModel> {
    if (!firebaseUser) {
      return Promise.resolve(null);
    }
    return {
      id: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      imageUrl: firebaseUser.photoURL,
      refreshToken: firebaseUser.refreshToken,
      idToken: await firebaseUser.getIdToken()
    }
  }

  parseAuthErrors(error: any) {
    switch (error.code) {
      case AuthErrorCode.INVALID_PASSWORD: return AuthErrorMessage.INVALID_PASSWORD;
      case AuthErrorCode.USER_NOT_FOUND: return AuthErrorMessage.USER_NOT_FOUND;
      case AuthErrorCode.WEAK_PASSWORD: return AuthErrorMessage.WEAK_PASSWORD;
      case AuthErrorCode.WRONG_PASSWORD: return AuthErrorMessage.WRONG_PASSWORD;
      case AuthErrorCode.INVALID_EMAIL: return AuthErrorMessage.INVALID_EMAIL;
      case AuthErrorCode.EMAIL_ALREADY_EXISTS: return AuthErrorMessage.EMAIL_ALREADY_EXISTS;
      case AuthErrorCode.POPUP_CLOSED: return AuthErrorMessage.POPUP_CLOSED;
      case AuthErrorCode.NETWORK_ERROR: return AuthErrorMessage.NETWORK_ERROR;
    }
    return 'An unknown error occurred';
  }
}
