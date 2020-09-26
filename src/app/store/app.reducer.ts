import {shoppingReducer} from '../modules/dashboard/store/reducers/shopping.reducer';
import {ShoppingStore} from '../modules/dashboard/models/shopping-store.model';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer} from '../modules/auth/store/reducers/auth.reducer';
import {AuthStore} from '../modules/auth/models/auth-store.model';
import {RecipeStore} from '../modules/dashboard/models/recipe-store.model';
import {recipeReducer} from '../modules/dashboard/store/reducers/recipes.reducer';

export interface AppState {
  auth: AuthStore,
  recipe: RecipeStore,
  shopping: ShoppingStore,
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  recipe: recipeReducer,
  shopping: shoppingReducer
};
