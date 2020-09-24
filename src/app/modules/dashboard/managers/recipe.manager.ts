import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import * as recipeActions from '../store/actions/recipes.action';
import {Recipe} from '../models/recipe.model';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

export class RecipeManager {

  constructor(private _store: Store<AppState>) {}

  fetchPrivateRecipes = () => this._store.dispatch(recipeActions.getPrivateRecipes())

  fetchPublicRecipes = () => this._store.dispatch(recipeActions.getPublicRecipes())

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
    const $loaded = this.isRecipesLoaded(is_private).pipe(distinctUntilChanged());
    const $loading = this.isRecipesLoading(is_private).pipe(distinctUntilChanged());
    combineLatest([$loaded, $loading]).subscribe(value => {
      if (!value[0] && !value[1]) {
        this._store.dispatch(is_private ?
          recipeActions.getPrivateRecipes() :
          recipeActions.getPublicRecipes()
        );
      }
    });
    return this._store.select('recipe').pipe(
      filter(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].isLoaded),
      map(recipeState => recipeState[is_private ? 'privateRecipes' : 'publicRecipes'].recipes)
    );
  }

  getEditedRecipe(): Observable<Recipe> {
    return this._store.select('recipe').pipe(map(recipeState => recipeState.editedRecipe));
  }
}
