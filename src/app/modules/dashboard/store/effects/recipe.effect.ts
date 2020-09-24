import {RecipeService} from '../../services/recipe.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {RecipeStoreActions} from '../../enums/recipe-store-actions.enum';
import {delay, map, switchMap} from 'rxjs/operators';
import {Recipe} from '../../models/recipe.model';
import * as recipeActions from '../actions/recipes.action';
import {RecipeStoreAction} from '../../models/recipe-store-action.model';

export class RecipeEffects {
  constructor(private _recipeService: RecipeService,
              private _actions$: Actions) {
  }

  @Effect()
  fetchPublicRecipes = this._actions$.pipe(
    ofType(RecipeStoreActions.GET_PUBLIC_RECIPES),
    switchMap(_ => {
      return this._recipeService.fetchRecipes().pipe(
        map((recipes: Recipe[]) => recipeActions.savePublicRecipes(recipes))
      );
    })
  )

  @Effect()
  fetchPrivateRecipes = this._actions$.pipe(
    ofType(RecipeStoreActions.GET_PRIVATE_RECIPES),
    switchMap(_ => {
      return this._recipeService.fetchRecipes(true).pipe(
        map((recipes: Recipe[]) => recipeActions.savePrivateRecipes(recipes))
      );
    })
  )

  @Effect()
  addRecipe = this._actions$.pipe(
    ofType(RecipeStoreActions.START_RECIPE_ADDITION),
    switchMap((data: RecipeStoreAction) => {
      return this._recipeService.createRecipe(data.payload.recipe).pipe(
        map((recipe: Recipe) => recipeActions.addRecipe(recipe))
      );
    })
  )

  @Effect()
  updateRecipe = this._actions$.pipe(
    ofType(RecipeStoreActions.START_RECIPE_UPDATE),
    switchMap((data: RecipeStoreAction) => {
      return this._recipeService.updateRecipe(data.payload.recipe).pipe(
        map(_ => recipeActions.updateRecipe(data.payload.recipe))
      );
    })
  )

  @Effect()
  deleteRecipe = this._actions$.pipe(
    ofType(RecipeStoreActions.START_RECIPE_DELETION),
    switchMap((data: RecipeStoreAction) => {
      return this._recipeService.deleteRecipe(data.payload.recipeId, data.payload.is_private).pipe(
        map(_ => recipeActions.deleteRecipe(data.payload.recipeId, data.payload.is_private))
      );
    })
  )

  @Effect()
  clearActionState = this._actions$.pipe(
    ofType(RecipeStoreActions.ADD_RECIPE, RecipeStoreActions.UPDATE_RECIPE, RecipeStoreActions.DELETE_RECIPE),
    delay(1000),
    map(_ => recipeActions.clearActionStates()),
  )
}
