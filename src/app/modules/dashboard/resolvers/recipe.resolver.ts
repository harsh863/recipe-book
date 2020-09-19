import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {combineLatest, from, Observable, of, zip} from 'rxjs';
import {RecipeManager} from '../managers/recipe.manager';
import {take} from 'rxjs/operators';

export class RecipeResolver implements Resolve<any> {
  constructor(private _recipesManager: RecipeManager) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return combineLatest([
      this._recipesManager.selectRecipes().pipe(take(1)),
      this._recipesManager.selectRecipes(true).pipe(take(1))
    ]);
  }
}
