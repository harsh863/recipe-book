import { Injectable } from '@angular/core';
import {LoggedInUserManager} from '../../core/managers/logged-in-user.manager';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserModel} from '../../shared/models/user.model';
import {Ingredient} from '../models/ingredient.model';
import {from, Observable, Subject} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  loggedInUser: UserModel;
  constructor(private _loggedInUserManager: LoggedInUserManager,
              private _database: AngularFireDatabase) {
    this._loggedInUserManager.selectLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return from(this._database.list(`shopping/${this.loggedInUser.id}`).push(ingredient))
      .pipe(map((val: any) => ({id: val.path.pieces_[2], ...ingredient})));
  }

  addIngredients(ingredients: Ingredient[]): Observable<Ingredient[]> {
    const allIngredients: Ingredient[] = [];
    const $ingredient = new Subject<Ingredient[]>();
    ingredients.forEach(async (ingredient, index) => {
      allIngredients.push(await this.addIngredient(ingredient).pipe(take(1)).toPromise())
      if (index === ingredients.length - 1) {
        $ingredient.next(allIngredients);
      }
    });
    return $ingredient;
  }

  deleteIngredient(ingredientId: string): Observable<any> {
    return from(this._database.list(`shopping/${this.loggedInUser.id}/${ingredientId}`).remove())
      .pipe(map(_ => ({ message: 'deleted successfully' })));
  }

  deleteIngredients(ingredientIds: string[]): Observable<any> {
    const successOb$ = new Subject<{message: string}>();
    ingredientIds.forEach(async (ingredientId: string, index: number) => {
      await this.deleteIngredient(ingredientId);
      if (index === ingredientIds.length - 1) {
        successOb$.next({message: 'deleted successfully'});
      }
    });
    return successOb$;
  }

  updateIngredient(ingredient: Ingredient): Observable<any> {
    return from(this._database.object(`shopping/${this.loggedInUser.id}/${ingredient.id}`).set(ingredient))
      .pipe(map(_ => ({message: 'updated successfully'})));
  }

  fetchIngredients(): Observable<Ingredient[]> {
    const $ingredients = new Subject<Ingredient[]>();
    this._database.database.ref(`shopping/${this.loggedInUser.id}`).once('value', snapshotChanges => {
      const data: { [id: string]: Ingredient } = snapshotChanges.val() || {};
      $ingredients.next(Object.entries(data).map(entry => ({id: entry[0], ...entry[1]})) as Ingredient[]);
    });
    return $ingredients;
  }
}
