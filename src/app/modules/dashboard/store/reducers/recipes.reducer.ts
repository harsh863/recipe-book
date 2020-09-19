import {RecipeStore} from '../../models/recipe-store.model';
import {RecipeStoreAction} from '../../models/recipe-store-action.model';

export const recipeReducer = (
  state: RecipeStore = getRecipeInitialState(),
  action: RecipeStoreAction): RecipeStore => {
  switch (action.type) {
    default: return state;
  }
}

export const getRecipeInitialState = (): RecipeStore =>
  ({
    privateRecipes: {
      recipes: [],
      isLoaded: false,
      isLoading: false
    },
    publicRecipes: {
      recipes: [],
      isLoaded: false,
      isLoading: false
    },
    actionStates: getInitialActionStates(),
    previewRecipe: null,
    editedRecipe: null
  });

export const getInitialActionStates = () =>
  ({
    recipeAdded: false,
    recipeDeleted: false,
    recipeUpdated: false
  });
