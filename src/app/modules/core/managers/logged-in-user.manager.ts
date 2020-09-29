import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {distinctUntilChanged, filter, map, skipUntil, take} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {UserModel} from '../../shared/models/user.model';
import {fetchLoggedInUser} from '../../auth/store/actions/auth.action';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
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
    this.handleUserFetch();
    return this._store.select('auth').pipe(
      skipUntil(this.isLoggedInUserLoaded()),
      filter(value => !!value.loggedInUser.user),
      map(value => value.loggedInUser.user));
  }

  async handleUserFetch() {
    const loaded = await this.isLoggedInUserLoaded().pipe(distinctUntilChanged(), take(1)).toPromise();
    const loading = await this.isLoggedInUserLoading().pipe(distinctUntilChanged(), take(1)).toPromise();
    if (!loaded && !loading) {
      this._store.dispatch(fetchLoggedInUser());
    }
  }
}
