import { Injectable } from '@angular/core';
import {LoggedInUserManager} from '../../core/managers/logged-in-user.manager';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserModel} from '../../shared/models/user.model';
import {Ingredient} from '../models/ingredient.model';
import {from, Observable, Subject} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private _loggedInUser: UserModel;
  private _ingredients: Ingredient[] = [];

  constructor(private _loggedInUserManager: LoggedInUserManager,
              private _database: AngularFireDatabase) {
    this._loggedInUserManager.selectLoggedInUser().subscribe(user => {
      this._loggedInUser = user;
    });
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    const duplicateIngredientIndex = this._ingredients.findIndex(
      ingredientItem =>
        ingredientItem.name.toLowerCase() === ingredient.name.toLowerCase() &&
        ingredientItem.unit && ingredient.unit
    );

    if (duplicateIngredientIndex !== -1) {
      let duplicateIngredient = this._ingredients[duplicateIngredientIndex];
      duplicateIngredient = { ...duplicateIngredient, quantity: (+duplicateIngredient.quantity) + (+ingredient.quantity) };
      return this.updateIngredient(duplicateIngredient).pipe(map(_ => duplicateIngredient));
    }
    return from(this._database.list(`shopping/${this._loggedInUser.id}`).push(ingredient))
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
    return from(this._database.list(`shopping/${this._loggedInUser.id}/${ingredientId}`).remove())
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
    const duplicateIngredientIndex = this._ingredients.findIndex(
      ingredientItem =>
        ingredientItem.name.toLowerCase() === ingredient.name.toLowerCase() &&
        ingredientItem.unit === ingredient.unit &&
        ingredientItem.id !== ingredient.id
    );

    if (duplicateIngredientIndex !== -1) {
      let duplicateIngredient = this._ingredients[duplicateIngredientIndex];
      duplicateIngredient = { ...duplicateIngredient, quantity: (+duplicateIngredient.quantity) + (+ingredient.quantity) };
      return this.updateIngredient(duplicateIngredient)
        .pipe(switchMap(_ => this.deleteIngredient(ingredient.id)), map(_ => ({ message: 'updated successfully' }) ))
    }
    return from(this._database.object(`shopping/${this._loggedInUser.id}/${ingredient.id}`).set(ingredient))
      .pipe(map(_ => ({ message: 'updated successfully' })));
  }

  fetchIngredients(): Observable<Ingredient[]> {
    const $ingredients = new Subject<Ingredient[]>();
    this._database.database.ref(`shopping/${this._loggedInUser.id}`).on('value', snapshotChanges => {
      const data: { [id: string]: Ingredient } = snapshotChanges.val() || {};
      this._ingredients = Object.entries(data).map(entry => ({ id: entry[0], ...entry[1] }) );
      $ingredients.next(this._ingredients);
    });
    return $ingredients;
  }
}
