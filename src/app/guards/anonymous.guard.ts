import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {noop, Observable} from 'rxjs';
import {AuthManager} from '../modules/auth/managers/auth.manager';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate  {
  constructor(private _router: Router,
              private _authManager: AuthManager) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authManager.isUserLoggedIn().pipe(map(val => {
      val ? this._router.navigate(['/']) : noop();
      return !val;
    }));
  }
}
