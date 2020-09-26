import {ShoppingStore} from '../../models/shopping-store.model';
import {ShoppingStoreAction} from '../../models/shopping-store-action.model';
import {ShoppingStoreActions} from '../../enums/shopping-store-actions.enum';
import {Ingredient} from '../../models/ingredient.model';

export function shoppingReducer ( state: ShoppingStore = getShoppingInitialState(), action: ShoppingStoreAction): ShoppingStore {

  switch (action.type) {
    case ShoppingStoreActions.GET_SHOPPING_LIST: return startLoadingShoppingList(state);
    case ShoppingStoreActions.SAVE_SHOPPING_LIST: return saveShoppingList(state, action.payload);
    case ShoppingStoreActions.ADD_INGREDIENT: return addIngredient(state, action.payload);
    case ShoppingStoreActions.ADD_INGREDIENTS: return addIngredients(state, action.payload);
    case ShoppingStoreActions.DELETE_INGREDIENT: return deleteIngredient(state, action.payload);
    case ShoppingStoreActions.DELETE_INGREDIENTS: return deleteIngredients(state, action.payload);
    case ShoppingStoreActions.OPEN_INGREDIENT_EDIT_FORM: return startIngredientUpdate(state, action.payload);
    case ShoppingStoreActions.UPDATE_INGREDIENT: return updateIngredient(state, action.payload);
    case ShoppingStoreActions.CLOSE_INGREDIENT_EDIT_FORM: return stopIngredientUpdate(state);
    case ShoppingStoreActions.CLEAR_ACTION_STATES: return clearActionStates(state);
    default: return state;
  }
}

const startLoadingShoppingList = (state: ShoppingStore): ShoppingStore =>
  ({
    ...state,
    shoppingList: { ...state.shoppingList, isLoading: true , isLoaded: false }
  });

const saveShoppingList = (state: ShoppingStore, data: {ingredients: Ingredient[]}): ShoppingStore =>
  ({
    ...state,
    shoppingList: { isLoading: false, isLoaded: true, ingredients: data.ingredients }
  });

const addIngredient = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore =>
  ({
    ...state,
    shoppingList: { ...state.shoppingList, ingredients: [...state.shoppingList.ingredients, data.ingredient] },
    actionStates: { ...state.actionStates, ingredientAdded: true }
  });

const addIngredients = (state: ShoppingStore, data: { ingredients: Ingredient[] }): ShoppingStore =>
  ({
    ...state,
    shoppingList: { ...state.shoppingList, ingredients: [...state.shoppingList.ingredients, ...data.ingredients] },
    actionStates: { ...state.actionStates, ingredientsAdded: true }
  });

const deleteIngredient = (state: ShoppingStore, data: { id: string }): ShoppingStore =>
  ({
    ...state,
    shoppingList: { ...state.shoppingList, ingredients: [...state.shoppingList.ingredients].filter(ingredient => ingredient.id !== data.id) },
    actionStates: { ...state.actionStates, ingredientDeleted: true },
    editedIngredient: state.editedIngredient ? (state.editedIngredient.id === data.id ? null : { ...state.editedIngredient }) : null
  });

const deleteIngredients = (state: ShoppingStore, data: { ids: string[] }): ShoppingStore =>
  ({
    ...state,
    shoppingList: { ...state.shoppingList, ingredients: [...state.shoppingList.ingredients].filter(ingredient => !data.ids.includes(ingredient.id)) },
    actionStates: { ...state.actionStates, ingredientsDeleted: true },
    editedIngredient: state.editedIngredient ? (data.ids.includes(state.editedIngredient.id) ? null : { ...state.editedIngredient }) : null
  });

const startIngredientUpdate = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore =>
  ({
    ...state,
    editedIngredient: data.ingredient
  });

const updateIngredient = (state: ShoppingStore, data: { ingredient: Ingredient }): ShoppingStore => {
  const ingredients: Ingredient[] = [...state.shoppingList.ingredients];
  const index = ingredients.findIndex(ingredient => ingredient.id === data.ingredient.id);
  ingredients[index] = data.ingredient;
  return {
    ...state,
    shoppingList: { ...state.shoppingList, ingredients },
    actionStates: { ...getInitialActionStates(), ingredientUpdated: true },
    editedIngredient: null
  };
}

const clearActionStates = (state: ShoppingStore): ShoppingStore =>
  ({
    ...state,
    actionStates: getInitialActionStates()
  });

const stopIngredientUpdate = (state: ShoppingStore): ShoppingStore =>
  ({
    ...state,
    editedIngredient: null
  });

const getShoppingInitialState = (): ShoppingStore =>
  ({
    shoppingList: getInitialShoppingList(),
    actionStates: getInitialActionStates(),
    editedIngredient: null
  });

const getInitialShoppingList = () =>
  ({ ingredients: [], isLoaded: false, isLoading: false });

const getInitialActionStates = () =>
  ({ ingredientAdded: false, ingredientsAdded: false, ingredientUpdated: false, ingredientDeleted: false, ingredientsDeleted: false });
