import { Injectable } from '@angular/core';
import {Recipe} from '../models/recipe.model';
import {map} from 'rxjs/operators';
import {firebaseInstance} from '../../../../main';
import {from, Observable, Subject} from 'rxjs';

@Injectable()
export class RecipeService {

  database = firebaseInstance.database().ref('recipes');

  constructor() { }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return from(this.database.push(recipe))
      .pipe(map((val: any) => ({id: val.path.pieces_[1], ...recipe})));
  }

  fetchRecipes(is_private = false): Observable<Recipe[]> {
    let $recipes = new Subject<Recipe[]>();
    this.database.orderByChild('is_private').equalTo(is_private).once('value', snapshotChanges => {
      const val = snapshotChanges.val();
      if (val) {
        const recipes: Recipe[] = Object.entries(val).map((entry: [string, Recipe]) => ({...entry[1], id: entry[0]}));
        $recipes.next(recipes);
      } else {
        $recipes.next([]);
      }
    });
    return $recipes;
  }
}
