import {Actions, Effect, ofType} from '@ngrx/effects';
import {ShoppingService} from '../../services/shopping.service';
import {ShoppingStoreActions} from '../../enums/shopping-store-actions.enum';
import {delay, map, switchMap} from 'rxjs/operators';
import {Ingredient} from '../../models/ingredient.model';
import * as shoppingActions from '../actions/shopping.action';
import {ShoppingStoreAction} from '../../models/shopping-store-action.model';
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingEffects {
  constructor(private _shoppingService: ShoppingService,
              private _actions$: Actions) {
  }

  @Effect()
  fetchShoppingList = this._actions$.pipe(
    ofType(ShoppingStoreActions.GET_SHOPPING_LIST),
    switchMap(_ => {
      return this._shoppingService.fetchIngredients().pipe(
        map((ingredients: Ingredient[]) => shoppingActions.saveShoppingList(ingredients))
      );
    })
  );

  @Effect()
  addIngredient = this._actions$.pipe(
    ofType(ShoppingStoreActions.START_INGREDIENT_ADDITION),
    switchMap((data: ShoppingStoreAction) => {
      return this._shoppingService.addIngredient(data.payload.ingredient).pipe(
        map(ingredient => shoppingActions.addIngredient(ingredient))
      );
    })
  );

  @Effect()
  addIngredients = this._actions$.pipe(
    ofType(ShoppingStoreActions.START_INGREDIENTS_ADDITION),
    switchMap((data: ShoppingStoreAction) => {
      return this._shoppingService.addIngredients(data.payload.ingredients).pipe(
        map(ingredients => shoppingActions.addIngredients(ingredients))
      );
    })
  );

  @Effect()
  updateIngredient = this._actions$.pipe(
    ofType(ShoppingStoreActions.START_INGREDIENT_UPDATE),
    switchMap((data: ShoppingStoreAction) => {
      return this._shoppingService.updateIngredient(data.payload.ingredient).pipe(
        map(_ => shoppingActions.updateIngredient(data.payload.ingredient))
      );
    })
  );

  @Effect()
  deleteIngredient = this._actions$.pipe(
    ofType(ShoppingStoreActions.START_INGREDIENT_DELETION),
    switchMap((data: ShoppingStoreAction) => {
      return this._shoppingService.deleteIngredient(data.payload.id).pipe(
        map(_ => shoppingActions.deleteIngredient(data.payload.id))
      );
    })
  );

  @Effect()
  deleteIngredients = this._actions$.pipe(
    ofType(ShoppingStoreActions.START_INGREDIENTS_DELETION),
    switchMap((data: ShoppingStoreAction) => {
      return this._shoppingService.deleteIngredients(data.payload.ids).pipe(
        map(_ => shoppingActions.deleteIngredients(data.payload.ids))
      );
    })
  );

  @Effect()
  clearActionStates = this._actions$.pipe(
    ofType(ShoppingStoreActions.ADD_INGREDIENT, ShoppingStoreActions.ADD_INGREDIENTS, ShoppingStoreActions.DELETE_INGREDIENT, ShoppingStoreActions.DELETE_INGREDIENTS, ShoppingStoreActions.UPDATE_INGREDIENT),
    delay(500),
    map(_ => shoppingActions.clearActionStates())
  )
}
