import { Injectable } from '@angular/core';
import {Recipe} from '../models/recipe.model';
import {ApiService} from '../../../services/api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class RecipeService {

  constructor(private _apiService: ApiService) { }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this._apiService.post<{name: string}>('recipes.json', recipe)
      .pipe(map(res => ({...recipe, id: res.name})));
  }

  fetchPublicRecipes() {
    const queryParams = '?orderBy="is_private"&equalTo="' + false + '"';
    return this._apiService.get('recipes.json' + queryParams);
  }
}
