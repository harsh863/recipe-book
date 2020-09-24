import {RecipeStoreAction} from '../../models/recipe-store-action.model';
import {RecipeStoreActions} from '../../enums/recipe-store-actions.enum';
import {Recipe} from '../../models/recipe.model';

export const savePublicRecipes = (recipes: Recipe[]): RecipeStoreAction =>
  ({ type: RecipeStoreActions.SAVE_PUBLIC_RECIPES, payload: { recipes } });

export const savePrivateRecipes = (recipes: Recipe[]): RecipeStoreAction =>
  ({ type: RecipeStoreActions.SAVE_PRIVATE_RECIPES, payload: { recipes } });

export const addRecipe = (recipe: Recipe): RecipeStoreAction =>
  ({ type: RecipeStoreActions.ADD_RECIPE, payload: { recipe } });

export const updateRecipe = (recipe: Recipe): RecipeStoreAction =>
  ({ type: RecipeStoreActions.UPDATE_RECIPE, payload: { recipe } });

export const deleteRecipe = (recipeId: string, is_private: boolean): RecipeStoreAction =>
  ({ type: RecipeStoreActions.DELETE_RECIPE, payload: { recipeId, is_private } });

export const openEditWindow = (recipe: Recipe): RecipeStoreAction =>
  ({ type: RecipeStoreActions.OPEN_RECIPE_EDIT_WINDOW, payload: { recipe } });

export const closeEditWindow = (): RecipeStoreAction =>
  ({ type: RecipeStoreActions.CLOSE_RECIPE_EDIT_WINDOW });

export const clearActionStates = (): RecipeStoreAction =>
  ({ type: RecipeStoreActions.CLEAR_ACTION_STATES })


// below are the actions just for triggering [Recipe] effects

export const getPublicRecipes = (): RecipeStoreAction =>
  ({ type: RecipeStoreActions.GET_PUBLIC_RECIPES });

export const getPrivateRecipes = (): RecipeStoreAction =>
  ({ type: RecipeStoreActions.GET_PRIVATE_RECIPES });

export const startRecipeAdd = (recipe: Recipe): RecipeStoreAction =>
  ({ type: RecipeStoreActions.START_RECIPE_ADDITION, payload: { recipe } });

export const startRecipeUpdate = (recipe: Recipe): RecipeStoreAction =>
  ({ type: RecipeStoreActions.START_RECIPE_UPDATE, payload: { recipe } });

export const startRecipeDelete = (recipeId: string, is_private: boolean): RecipeStoreAction =>
  ({ type: RecipeStoreActions.START_RECIPE_DELETION, payload: { recipeId, is_private } });
