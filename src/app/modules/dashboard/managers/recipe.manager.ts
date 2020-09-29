import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as recipeActions from '../store/actions/recipes.action';
import {Recipe} from '../models/recipe.model';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, take} from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeManager {

  constructor(private _store: Store<AppState>) {}

  addRecipe = (recipe: Recipe) => this._store.dispatch(recipeActions.startRecipeAdd(recipe))

  updateRecipe = (recipe: Recipe) => this._store.dispatch(recipeActions.startRecipeUpdate(recipe))

  deleteRecipe = (recipeId: string, is_private: boolean) => this._store.dispatch(recipeActions.startRecipeDelete(recipeId, is_private))

  openRecipeEditForm = (recipe: Recipe) => this._store.dispatch(recipeActions.openEditWindow(recipe))

  closeRecipeEditForm = () => this._store.dispatch(recipeActions.closeEditWindow())

  getActionState(action: 'recipeAdded' | 'recipeUpdated' | 'recipeDeleted'): Observable<boolean> {
    return this._store.select('recipe').pipe(map(recipeState => recipeState.actionStates[action]))
  }

  isRecipesLoaded(is_private = false): Observable<boolean> {
    return this._store.select('recipe').pipe(map(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].isLoaded));
  }

  isRecipesLoading(is_private = false): Observable<boolean> {
    return this._store.select('recipe').pipe(map(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].isLoading));
  }

  selectRecipes(is_private = false): Observable<Recipe[]> {
    this.handleRecipeFetch(is_private);
    return this._store.select('recipe').pipe(
      filter(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].isLoaded),
      map(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].recipes)
    );
  }

  async handleRecipeFetch(is_private: boolean) {
    const loaded = await this.isRecipesLoaded(is_private).pipe(distinctUntilChanged(), take(1)).toPromise();
    const loading = await this.isRecipesLoading(is_private).pipe(distinctUntilChanged(), take(1)).toPromise();
    if (!loaded && !loading) {
      this._store.dispatch(is_private ?
        recipeActions.getPrivateRecipes() :
        recipeActions.getPublicRecipes()
      );
    }
  }

  getEditedRecipe(): Observable<Recipe> {
    return this._store.select('recipe').pipe(map(recipeState => recipeState.editedRecipe));
  }
}
