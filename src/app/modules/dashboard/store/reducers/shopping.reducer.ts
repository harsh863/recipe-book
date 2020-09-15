import {ShoppingStore} from '../../models/shopping-store.model';
import {ShoppingStoreAction} from '../../models/shopping-store-action.model';
import {ShoppingStoreActions} from '../../enums/shopping-store-actions.enum';
import {Ingredient} from '../../models/ingredient.model';

export const shoppingListReducer = (
  state: ShoppingStore = getShoppingListInitialState(),
  action: ShoppingStoreAction): ShoppingStore => {
  switch (action.type) {
    case ShoppingStoreActions.ADD_INGREDIENT: return addIngredient(state, action.payload);
    case ShoppingStoreActions.ADD_INGREDIENTS: return addIngredients(state, action.payload);
    case ShoppingStoreActions.DELETE_INGREDIENT: return deleteIngredient(state, action.payload);
    case ShoppingStoreActions.DELETE_INGREDIENTS: return deleteIngredients(state, action.payload);
    case ShoppingStoreActions.START_INGREDIENT_UPDATE: return startIngredientUpdate(state, action.payload);
    case ShoppingStoreActions.UPDATE_INGREDIENT: return updateIngredient(state, action.payload);
    case ShoppingStoreActions.STOP_INGREDIENT_UPDATE: return stopIngredientUpdate(state);
    default: return state;
  }
}

export const addIngredient = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore =>
  ({ ...state, ingredients: [...state.ingredients, data.ingredient] });

export const addIngredients = (state: ShoppingStore, data: { ingredients: Ingredient[] }): ShoppingStore =>
  ({ ...state, ingredients: [...state.ingredients, ...data.ingredients] });

export const deleteIngredient = (state: ShoppingStore, data: { id: string }): ShoppingStore =>
  ({ ...state, ingredients: [...state.ingredients].filter(ingredient => ingredient.id !== data.id) });

export const deleteIngredients = (state: ShoppingStore, data: { ids: string[] }): ShoppingStore =>
  ({ ...state, ingredients: [...state.ingredients].filter(ingredient => !data.ids.includes(ingredient.id)) });

export const startIngredientUpdate = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore =>
  ({ ...state, editedIngredient: data.ingredient });

export const updateIngredient = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore => {
  const ingredients: Ingredient[] = [...state.ingredients];
  const index = ingredients.findIndex(ingredient => ingredient.id === data.ingredient.id);
  ingredients[index] = data.ingredient;
  return { ...state, ingredients };
}

export const stopIngredientUpdate = (state: ShoppingStore): ShoppingStore =>
  ({ ...state, editedIngredient: null });

export const getShoppingListInitialState = (): ShoppingStore =>
  ({ ingredients: [], editedIngredient: null });
