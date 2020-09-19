import {RecipeStore} from '../../models/recipe-store.model';
import {RecipeStoreAction} from '../../models/recipe-store-action.model';
import {Recipe} from '../../models/recipe.model';
import {RecipeStoreActions} from '../../enums/recipe-store-actions.enum';

export const recipeReducer = (
  state: RecipeStore = getRecipeInitialState(),
  action: RecipeStoreAction): RecipeStore => {
  switch (action.type) {
    case RecipeStoreActions.GET_PUBLIC_RECIPES: return getPublicRecipe(state);
    case RecipeStoreActions.SAVE_PUBLIC_RECIPES: return savePublicRecipe(state, action.payload);
    case RecipeStoreActions.GET_PRIVATE_RECIPES: return getPrivateRecipe(state);
    case RecipeStoreActions.SAVE_PRIVATE_RECIPES: return savePrivateRecipe(state, action.payload);
    case RecipeStoreActions.OPEN_RECIPE: return openRecipe(state, action.payload);
    case RecipeStoreActions.CLOSE_RECIPE: return closeRecipe(state);
    case RecipeStoreActions.ADD_RECIPE: return addRecipe(state, action.payload);
    case RecipeStoreActions.UPDATE_RECIPE: return updateRecipe(state, action.payload);
    case RecipeStoreActions.DELETE_RECIPE: return deleteRecipe(state, action.payload);
    case RecipeStoreActions.OPEN_RECIPE_EDIT_WINDOW: return openRecipeEditForm(state, action.payload);
    case RecipeStoreActions.CLOSE_RECIPE_EDIT_WINDOW: return closeRecipeEditForm(state);
    case RecipeStoreActions.CLEAR_ACTION_STATES: return clearActionStates(state);
    default: return state;
  }
}

export const getPublicRecipe = (state: RecipeStore): RecipeStore =>
  ({
    ...state,
    publicRecipes: { recipes: [], isLoaded: false, isLoading: true }
  });

export const savePublicRecipe = (state: RecipeStore, data: { recipes: Recipe[]}): RecipeStore =>
  ({
    ...state,
    publicRecipes: { recipes: [...data.recipes], isLoaded: true, isLoading: false }
  });

export const getPrivateRecipe = (state: RecipeStore): RecipeStore =>
  ({
    ...state,
    privateRecipes: { recipes: [], isLoaded: false, isLoading: true }
  });

export const savePrivateRecipe = (state: RecipeStore, data: { recipes: Recipe[]}): RecipeStore =>
  ({
    ...state,
    privateRecipes: { recipes: [...data.recipes], isLoaded: true, isLoading: false }
  });

export const openRecipe = (state: RecipeStore, data: { recipe: Recipe}): RecipeStore =>
  ({
    ...state,
    previewRecipe: data.recipe
  });

export const closeRecipe = (state: RecipeStore): RecipeStore =>
  ({
    ...state,
    previewRecipe: null
  });

export const addRecipe = (state: RecipeStore, data: { recipe: Recipe}): RecipeStore => {
  const updatedState = {...state};
  const key = data.recipe.is_private ? 'privateRecipes' : 'publicRecipes';
  updatedState[key] = {...updatedState[key], recipes: [...updatedState[key].recipes, data.recipe] }
  updatedState.actionStates = {...updatedState.actionStates, recipeAdded: true }
  return updatedState;
}

export const updateRecipe = (state: RecipeStore, data: { recipe: Recipe}): RecipeStore => {
  const updatedState = {...state};
  const key = data.recipe.is_private ? 'privateRecipes' : 'publicRecipes';
  const updated_recipes = [...updatedState[key].recipes].map(recipe => recipe.id === data.recipe.id ? data.recipe : recipe);
  updatedState[key] = {...updatedState[key], recipes: updated_recipes}
  updatedState.actionStates = {...updatedState.actionStates, recipeUpdated: true }
  return updatedState;
}

export const deleteRecipe = (state: RecipeStore, data: { recipeId: string, is_private: boolean }) => {
  const updatedState = {...state};
  const key = data.is_private ? 'privateRecipes' : 'publicRecipes';
  updatedState[key] = { ...updatedState[key], recipes: [...updatedState[key].recipes].filter(recipe => recipe.id !== data.recipeId) };
  updatedState.actionStates = {...updatedState.actionStates, recipeDeleted: true };
  return updatedState;
}

export const openRecipeEditForm = (state: RecipeStore, data: { recipe: Recipe}): RecipeStore =>
  ({
    ...state,
    editedRecipe: data.recipe
  });

export const closeRecipeEditForm = (state: RecipeStore): RecipeStore =>
  ({
    ...state,
    editedRecipe: null
  });

export const clearActionStates = (state: RecipeStore): RecipeStore =>
  ({
    ...state,
    actionStates: getInitialActionStates()
  });

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
