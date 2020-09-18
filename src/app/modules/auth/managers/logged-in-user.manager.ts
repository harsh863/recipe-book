import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {filter, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {fetchLoggedInUser} from '../store/actions/auth.action';

export class LoggedInUserManager {
  constructor(private _store: Store<AppState>) {
  }

  isLoggedInUserLoaded(): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => !!authState.user));
  }

  async selectLoggedInUser(): Promise<UserModel> {
    const loaded = await this.isLoggedInUserLoaded().pipe(take(1)).toPromise();
    if (!loaded) {
      this._store.dispatch(fetchLoggedInUser());
    }
    return this._store.select('auth').pipe(filter(authState => !!authState.user), map(value => value.user), take(1)).toPromise();
  }
}
