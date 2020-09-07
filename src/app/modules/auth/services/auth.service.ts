import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {UserModel} from '../../shared/models/user.model';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private _angularFireAuth: AngularFireAuth) {
  }

  signUp(email: string, password: string, username: string): Observable<UserModel> {
    return from(this._angularFireAuth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(switchMap(res => this.updateUserProfile(res.user, username)
          .pipe(switchMap(_ => this.parseUserInfo(this._angularFireAuth.auth.currentUser)))
      ));
  }

  googleAuth(): Observable<UserModel> {
    return from(this._angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(switchMap(res => from(this.parseUserInfo(res.user))));
  }

  updateUserProfile(firebaseUser: User, username: string): Observable<void> {
    return from(firebaseUser.updateProfile({displayName: username}));
  }

  signIn(email: string, password: string): Observable<UserModel> {
    return from(this._angularFireAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(switchMap(res => from(this.parseUserInfo(res.user))));
  }

  sendPasswordResetEmail(email: string) {
    return from(this._angularFireAuth.auth.sendPasswordResetEmail(email));
  }

  verifyResetToken(code: string): Observable<any> {
    return from(this._angularFireAuth.auth.verifyPasswordResetCode(code));
  }

  async parseUserInfo(firebaseUser: User): Promise<UserModel> {
    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      imageUrl: firebaseUser.photoURL,
      refreshToken: firebaseUser.refreshToken,
      idToken: await firebaseUser.getIdToken()
    }
  }

  logout() {
    this._angularFireAuth.auth.signOut();
  }
}
