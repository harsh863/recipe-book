import {RecipeStoreActions} from '../enums/recipe-store-actions.enum';

export interface RecipeStoreAction {
  type: RecipeStoreActions,
  payload?: any;
}
