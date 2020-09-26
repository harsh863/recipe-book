import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RecipeManager} from '../managers/recipe.manager';
import {take} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
import {Recipe} from '../models/recipe.model';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeResolver implements Resolve<Recipe[][]> {
  constructor(private _recipesManager: RecipeManager) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[][]> {
    return forkJoin(
      this._recipesManager.selectRecipes().pipe(take(1)),
      this._recipesManager.selectRecipes(true).pipe(take(1))
    );
  }
}
