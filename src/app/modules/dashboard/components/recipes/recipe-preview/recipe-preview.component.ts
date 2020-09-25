import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Recipe} from '../../../models/recipe.model';
import {Router} from '@angular/router';
import {RecipeManager} from '../../../managers/recipe.manager';
import {filter} from 'rxjs/operators';
import {NotificationService} from '../../../../shared/services/notification.service';
import {ShoppingService} from '../../../services/shopping.service';
import {ShoppingManager} from '../../../managers/shopping.manager';
import {FormControl, FormGroup} from '@angular/forms';
import {Ingredient} from '../../../models/ingredient.model';

@Component({
  selector: 'rb-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})
export class RecipePreviewComponent implements OnInit {

  constructor(private _router: Router,
              private _notificationService: NotificationService,
              private _recipeManager: RecipeManager,
              private _shoppingManager: ShoppingManager) { }

  recipe: Recipe;
  onClose = new Subject<boolean>();
  deletingRecipe = false;
  addingIngredient = false;
  control = {};
  ingredientsForm = new FormGroup(this.control);
  selectedIngredientsCount = 0;


  ngOnInit() {
    this.handleActionState();
    this.recipe.ingredients.forEach((ingredient, index) => {
      this.control[index] = new FormControl(false);
    });
    this.ingredientsForm = new FormGroup(this.control);
    this.ingredientsForm.valueChanges.subscribe(val => {
      this.selectedIngredientsCount = Object.values(val).filter(i => !!i).length;
    })
  }

  shouldApplyMargin(): boolean {
    return this.recipe.recipe.includes('<ol>') || this.recipe.recipe.includes('<ul>') || this.recipe.recipe.includes('<li>');
  }

  editRecipe() {
    this.onClose.next();
    this._recipeManager.openRecipeEditForm(this.recipe);
    this._router.navigate(['dashboard/recipes/edit']);
  }

  deleteRecipe(event: MouseEvent) {
    event.stopPropagation();
    this.deletingRecipe = true;
    this._recipeManager.deleteRecipe(this.recipe.id, this.recipe.is_private);
  }

  handleActionState() {
    this._recipeManager.getActionState('recipeDeleted').pipe(filter(i => !!i)).subscribe(_ => {
      this.deletingRecipe = false;
      this._notificationService.show('Recipe deleted successfully', 'success');
      this.onClose.next();
    });
    this._shoppingManager.getActionState('ingredientsAdded').pipe(filter(i => !!i)).subscribe(_ => {
      this.addingIngredient = false;
      this._notificationService.show('Ingredients added successfully to Shopping List', 'success');
      this.ingredientsForm.reset();
    });
  }

  addIngredients() {
    this.addingIngredient = true;
    let ingredients: Ingredient[] = [];
    Object.entries(this.ingredientsForm.value).forEach(entry => {
      if (entry[1]) {
        ingredients.push(this.recipe.ingredients[entry[0]])
      }
    });
    if (ingredients.length === 0) {
      ingredients = [...this.recipe.ingredients];
    }
    this._shoppingManager.addIngredients(ingredients);
  }
}
