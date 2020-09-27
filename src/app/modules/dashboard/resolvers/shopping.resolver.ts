import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Ingredient} from '../models/ingredient.model';
import {ShoppingManager} from '../managers/shopping.manager';
import {take} from 'rxjs/operators';

@Injectable()
export class ShoppingResolver implements Resolve<Ingredient[]> {
  constructor(private _shoppingManager: ShoppingManager) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Ingredient[]> {
    return this._shoppingManager.selectIngredients().pipe(take(1)).toPromise();
  }

}
