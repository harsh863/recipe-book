import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoggedInUserManager} from '../managers/logged-in-user.manager';
import {UserModel} from '../../shared/models/user.model';
import {take} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class LoggedInUserResolver implements Resolve<UserModel>{
  constructor(private _loggedInUserManager: LoggedInUserManager) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return this._loggedInUserManager.selectLoggedInUser().pipe(take(1));
  }

}
