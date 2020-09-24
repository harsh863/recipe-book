import {Recipe} from './recipe.model';

export interface RecipeStore {
  privateRecipes: {
    recipes: Recipe[];
    isLoading: boolean;
    isLoaded: boolean;
  };
  publicRecipes: {
    recipes: Recipe[];
    isLoading: boolean;
    isLoaded: boolean;
  };
  actionStates: {
    recipeAdded: boolean;
    recipeUpdated: boolean;
    recipeDeleted: boolean;
  };
  editedRecipe: Recipe;
}
