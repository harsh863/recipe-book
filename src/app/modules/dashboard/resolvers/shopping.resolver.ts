import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Ingredient} from '../models/ingredient.model';
import {Observable} from 'rxjs';
import {ShoppingManager} from '../managers/shopping.manager';

@Injectable()
export class ShoppingResolver implements Resolve<Ingredient[]> {
  constructor(private _shoppingManager: ShoppingManager) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ingredient[]> | Promise<Ingredient[]> | Ingredient[] {
    return this._shoppingManager.selectIngredients();
  }

}
