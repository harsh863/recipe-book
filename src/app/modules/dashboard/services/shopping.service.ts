import { Injectable } from '@angular/core';
import {LoggedInUserManager} from '../../auth/managers/logged-in-user.manager';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserModel} from '../../shared/models/user.model';
import {Ingredient} from '../models/ingredient.model';
import {from, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

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
      .pipe(map((val: any) => ({id: val.path.pieces_[1], ...ingredient})));
  }

  deleteIngredient(ingredientId: string): Observable<any> {
    return from(this._database.list(`shopping/${this.loggedInUser.id}/${ingredientId}`).remove())
      .pipe(map(_ => ({ message: 'deleted successfully' })));
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
