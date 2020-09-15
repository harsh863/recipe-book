import {Ingredient} from './ingredient.model';

export interface ShoppingStore {
  ingredients: Ingredient[];
  editedIngredient?: Ingredient;
}
