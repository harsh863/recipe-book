import {ShoppingStoreAction} from '../../models/shopping-store-action.model';
import {ShoppingStoreActions} from '../../enums/shopping-store-actions.enum';
import {Ingredient} from '../../models/ingredient.model';

export const saveShoppingList = (ingredients: Ingredient[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.SAVE_SHOPPING_LIST, payload: { ingredients } });

export const addIngredient = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.ADD_INGREDIENT, payload: { ingredient } });

export const addIngredients = (ingredients: Ingredient[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.ADD_INGREDIENTS, payload: { ingredients } });

export const deleteIngredient = (id: string): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.DELETE_INGREDIENT, payload: { id } });

export const deleteIngredients = (ids: string[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.DELETE_INGREDIENTS, payload: { ids } });

export const updateIngredient = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.UPDATE_INGREDIENT, payload: { ingredient } });

export const openEditForm = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.OPEN_INGREDIENT_EDIT_FORM, payload: { ingredient } });

export const closeEditForm = (): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.CLOSE_INGREDIENT_EDIT_FORM });

export const clearActionStates = (): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.CLEAR_ACTION_STATES });


// below are the actions just for triggering [Shopping] effects

export const getShoppingList = (): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.GET_SHOPPING_LIST });

export const startIngredientAdd = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENT_ADDITION, payload: { ingredient }  });

export const startIngredientsAdd = (ingredients: Ingredient[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENTS_ADDITION, payload: { ingredients }  });

export const startIngredientDelete = (id: string): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENT_DELETION, payload: { id }  });

export const startIngredientsDelete = (ids: string[]): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENTS_DELETION, payload: { ids }  });

export const startIngredientUpdate = (ingredient: Ingredient): ShoppingStoreAction =>
  ({ type: ShoppingStoreActions.START_INGREDIENT_UPDATE, payload: { ingredient } });
