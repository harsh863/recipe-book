import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipeManager} from '../managers/recipe.manager';
import {take} from 'rxjs/operators';
import {Observable, zip} from 'rxjs';
import {Recipe} from '../models/recipe.model';

export class RecipeResolver implements Resolve<Recipe[][]> {
  constructor(private _recipesManager: RecipeManager) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[][]> {
    return zip([
      this._recipesManager.selectRecipes().pipe(take(1)),
      this._recipesManager.selectRecipes(true).pipe(take(1))
    ]);
  }
}
