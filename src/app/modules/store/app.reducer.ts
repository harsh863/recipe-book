import {shoppingReducer} from '../dashboard/store/reducers/shopping.reducer';
import {ShoppingStore} from '../dashboard/models/shopping-store.model';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer} from '../auth/store/reducers/auth.reducer';
import {AuthStore} from '../auth/models/auth-store.model';
import {RecipeStore} from '../dashboard/models/recipe-store.model';
import {recipeReducer} from '../dashboard/store/reducers/recipes.reducer';

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
