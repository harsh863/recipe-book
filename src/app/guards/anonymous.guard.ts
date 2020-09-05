import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AUTH_TOKEN} from '../modules/shared/constants/local-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate  {
  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      return true;
    }
    this._router.navigate(['/']);
    return false;
  }
}
