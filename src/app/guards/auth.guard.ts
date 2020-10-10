import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {noop, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthManager} from '../modules/auth/managers/auth.manager';
import {NotificationService} from '../modules/core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _notificationService: NotificationService,
              private _authManager: AuthManager) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authManager.isUserLoggedIn().pipe(tap(val => {
      !val ? this._router.navigate(['auth']) : noop();
      // @ts-ignore
    }), catchError(err => {
      console.log(err);
      // return of(true);
    }));
  }
}
