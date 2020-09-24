import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {distinctUntilChanged, filter, map, skipUntil, take} from 'rxjs/operators';
import {combineLatest, Observable, zip} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {fetchLoggedInUser} from '../store/actions/auth.action';

export class LoggedInUserManager {
  constructor(private _store: Store<AppState>) {
  }

  isLoggedInUserLoaded(): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => !!authState.loggedInUser.isLoaded));
  }

  isLoggedInUserLoading(): Observable<boolean> {
    return this._store.select('auth').pipe(map(authState => !!authState.loggedInUser.isLoading));
  }

  selectLoggedInUser(): Observable<UserModel> {
    const $loaded = this.isLoggedInUserLoaded().pipe(distinctUntilChanged());
    const $loading = this.isLoggedInUserLoading().pipe(distinctUntilChanged());
    combineLatest([$loaded, $loading]).subscribe(value => {
      if (!value[0] && !value[1]) {
        this._store.dispatch(fetchLoggedInUser());
      }
    });
    return this._store.select('auth').pipe(
      skipUntil(this.isLoggedInUserLoaded()),
      filter(value => !!value.loggedInUser.user),
      map(value => value.loggedInUser.user));
  }


}
