import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {RecipeManager} from '../../../managers/recipe.manager';

@Component({
  selector: 'rb-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  @Input() set filterValue(value: string) {
    this._filterValue = value;
    this.filter(value);
  }

  @Input() set isPrivateMode(value: boolean) {
    this._isPrivateMode = value;
    this.recipes = [];
    this.filteredRecipes = [];
    this._recipeManager.selectRecipes(value).subscribe(recipes => {
      this.recipes = [...recipes];
      this.filteredRecipes = [...recipes];
    });
  }

  constructor(private _recipeManager: RecipeManager) { }

  private _isPrivateMode: boolean;
  private _filterValue: string;

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  ngOnInit() {
  }

  filter(value: string) {
    this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes((value + '').toLowerCase()));
  }

}
