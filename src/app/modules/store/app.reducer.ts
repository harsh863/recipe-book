import {shoppingListReducer} from '../dashboard/store/reducers/shopping.reducer';
import {ShoppingStore} from '../dashboard/models/shopping-store.model';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer} from '../auth/store/reducers/auth.reducer';
import {AuthStore} from '../auth/models/auth-store.model';

export interface AppState {
  shoppingList: ShoppingStore,
  auth: AuthStore
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
