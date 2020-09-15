import {ShoppingStoreAction} from '../../models/shopping-store-action.model';
import {ShoppingStoreActions} from '../../enums/shopping-store-actions.enum';
import {Ingredient} from '../../models/ingredient.model';

export const addIngredient = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.ADD_INGREDIENT, payload: { ingredient } });

export const addIngredients = (ingredients: Ingredient[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.ADD_INGREDIENTS, payload: { ingredients } });

export const deleteIngredient = (id: string): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.DELETE_INGREDIENT, payload: { id } });

export const deleteIngredients = (ids: string[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.DELETE_INGREDIENTS, payload: { ids } });

export const startIngredientUpdate = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENT_UPDATE, payload: { ingredient } });

export const updateIngredient = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.UPDATE_INGREDIENT, payload: { ingredient } });

export const stopIngredientUpdate = (): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.STOP_INGREDIENT_UPDATE });
