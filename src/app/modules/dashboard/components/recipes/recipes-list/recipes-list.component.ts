import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {RecipeManager} from '../../../managers/recipe.manager';
import {RandomColorUtils} from '../../../../../utils/random-color.utils';

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
    this.loading = true;
    this._recipeManager.selectRecipes(value).subscribe(recipes => {
      this.recipes = [...recipes];
      this.loading = false;
      this.filteredRecipes = [...recipes];
    });
  }

  get isPrivateMode(): boolean {
    return this._isPrivateMode;
  }

  constructor(private _recipeManager: RecipeManager) { }

  private _isPrivateMode: boolean;
  private _filterValue: string;

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;
  randomColor = RandomColorUtils.getRandomColor();

  ngOnInit() {
  }

  filter(value: string) {
    this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes((value + '').toLowerCase()));
  }

}
