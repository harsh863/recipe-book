import { Injectable } from '@angular/core';
import {Recipe} from '../models/recipe.model';
import {map} from 'rxjs/operators';
import {from, Observable, Subject} from 'rxjs';
import {LoggedInUserManager} from '../../core/managers/logged-in-user.manager';
import {UserModel} from '../../shared/models/user.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class RecipeService {

  loggedInUser: UserModel;
  constructor(private _loggedInUserManager: LoggedInUserManager,
              private _database: AngularFireDatabase) {
    this._loggedInUserManager.selectLoggedInUser().subscribe(user => {
      this.loggedInUser = user;
    });
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    const is_private = recipe.is_private;
    const path = is_private ? `private-recipes/${this.loggedInUser.id}` : 'public-recipes';
    const updatedRecipe: Recipe = {...recipe};
    if (!is_private) {
      updatedRecipe.userId = this.loggedInUser.id;
    }
    return from(this._database.list(path).push(updatedRecipe))
      .pipe(map((val: any) => ({id: val.path.pieces_[is_private ? 2 : 1], ...updatedRecipe})));
  }

  fetchRecipes(is_private = false): Observable<Recipe[]> {
    const path = is_private ? `private-recipes/${this.loggedInUser.id}` : 'public-recipes';
    let $recipes = new Subject<Recipe[]>();
    this._database.database.ref(path).once('value', snapshotChanges => {
      const data: { [id: string]: Recipe } = snapshotChanges.val() || {};
      $recipes.next(Object.entries(data).map(entry => ({id: entry[0], ...entry[1]})) as Recipe[]);
    });
    return $recipes;
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    const path = recipe.is_private ? `private-recipes/${this.loggedInUser.id}` : 'public-recipes';
    return from(this._database.object(`${path}/${recipe.id}`).set(recipe))
      .pipe(map(_ => ({message: 'updated successfully'})));
  }

  deleteRecipe(recipeId: string, is_private = false): Observable<any> {
    const path = is_private ? `private-recipes/${this.loggedInUser.id}` : 'public-recipes';
    return from(this._database.list(`${path}/${recipeId}`).remove())
      .pipe(map(_ => ({ message: 'deleted successfully' })));
  }
}
