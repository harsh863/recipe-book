import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {from, Observable} from 'rxjs';
import {LoggedInUserManager} from '../managers/logged-in-user.manager';
import {UserModel} from '../../shared/models/user.model';
import {take} from 'rxjs/operators';

export class LoggedInUserResolver implements Resolve<UserModel>{
  constructor(private _loggedInUserManager: LoggedInUserManager) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Promise<UserModel> | UserModel {
    return from(this._loggedInUserManager.selectLoggedInUser()).pipe(take(1));
  }

}
