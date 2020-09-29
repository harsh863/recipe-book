import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import * as shoppingActions from '../store/actions/shopping.action';
import {Ingredient} from '../models/ingredient.model';
import {distinctUntilChanged, filter, map, take} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingManager {
  constructor(private _store: Store<AppState>) {
  }

  addIngredient = (ingredient: Ingredient) => this._store.dispatch(shoppingActions.startIngredientAdd(ingredient))

  addIngredients = (ingredients: Ingredient[]) => this._store.dispatch(shoppingActions.startIngredientsAdd(ingredients))

  updateIngredient = (ingredient: Ingredient) =>  this._store.dispatch(shoppingActions.startIngredientUpdate(ingredient))

  deleteIngredient = (id: string) => this._store.dispatch(shoppingActions.startIngredientDelete(id))

  deleteIngredients = (ids: string[]) => this._store.dispatch(shoppingActions.startIngredientsDelete(ids))

  getActionState = (
    action: 'ingredientAdded'
      | 'ingredientsAdded'
      | 'ingredientUpdated'
      | 'ingredientDeleted'
      | 'ingredientsDeleted') =>
    this._store.select('shopping').pipe(map(shoppingState => shoppingState.actionStates[action]));

  startEditIngredient = (ingredient: Ingredient) => this._store.dispatch(shoppingActions.openEditForm(ingredient))

  stopEditIngredient = () => this._store.dispatch(shoppingActions.closeEditForm())

  selectEditedIngredient(): Observable<Ingredient> {
    return this._store.select('shopping').pipe(map(shoppingState => shoppingState.editedIngredient));
  }

  isShoppingListLoaded(): Observable<boolean> {
    return this._store.select('shopping').pipe(map(shoppingState => shoppingState.shoppingList.isLoaded));
  }

  isShoppingListLoading(): Observable<boolean> {
    return this._store.select('shopping').pipe(map(shoppingState => shoppingState.shoppingList.isLoading));
  }

  selectIngredients(): Observable<Ingredient[]> {
    this.handleShoppingListFetch();
    return this._store.select('shopping').pipe(
      filter(shoppingState => shoppingState.shoppingList.isLoaded),
      map(shoppingState => shoppingState.shoppingList.ingredients)
    );
  }

  async handleShoppingListFetch() {
    const loaded = await this.isShoppingListLoaded().pipe(distinctUntilChanged(), take(1)).toPromise();
    const loading = await this.isShoppingListLoading().pipe(distinctUntilChanged(), take(1)).toPromise();
    if (!loaded && !loading) {
      this._store.dispatch(shoppingActions.getShoppingList());
    }
  }
}
