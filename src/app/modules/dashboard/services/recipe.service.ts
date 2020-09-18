import { Injectable } from '@angular/core';
import {Recipe} from '../models/recipe.model';
import {map} from 'rxjs/operators';
import {firebaseInstance} from '../../../../main';
import {from, Observable, Subject} from 'rxjs';
import {LoggedInUserManager} from '../../auth/managers/logged-in-user.manager';
import {UserModel} from '../../shared/models/user.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class RecipeService {

  loggedInUser: UserModel;
  constructor(private _loggedInUserManager: LoggedInUserManager,
              private _angularFireDatabase: AngularFireDatabase) {
    this._loggedInUserManager.selectLoggedInUser().then(user => this.loggedInUser = user);
  }

  createPrivateRecipe(recipe: Recipe): Observable<Recipe> {
    const database = firebaseInstance.database().ref(`private-recipes/${this.loggedInUser.id}`);
    return from(database.push(recipe))
      .pipe(map((val: any) => ({id: val.path.pieces_[1], ...recipe})));
  }

  getPrivateRecipes() {
    console.log(1);
    this._angularFireDatabase.list('private-recipes').valueChanges().subscribe(i => {
      console.log(2, i);
    })
  }
}
