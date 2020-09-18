import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {noop, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthManager} from '../modules/auth/managers/auth.manager';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _authManager: AuthManager) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authManager.isUserLoggedIn().pipe(tap(val => {
      !val ? this._router.navigate(['auth']) : noop();
    }));
  }
}
