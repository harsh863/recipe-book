import {Ingredient} from './ingredient.model';

export interface ShoppingStore {
  shoppingList: {
    ingredients: Ingredient[];
    isLoading: boolean;
    isLoaded: boolean;
  };
  actionStates: {
    ingredientAdded: boolean;
    ingredientsAdded: boolean;
    ingredientUpdated: boolean;
    ingredientDeleted: boolean;
    ingredientsDeleted: boolean;
  };
  editedIngredient?: Ingredient;
}
