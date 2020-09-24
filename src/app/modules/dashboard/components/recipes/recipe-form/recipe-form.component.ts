import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileUploadService} from '../../../services/file-upload.service';
import {RecipeManager} from '../../../managers/recipe.manager';
import {filter} from 'rxjs/operators';
import {NotificationService} from '../../../../shared/services/notification.service';
import {Recipe} from '../../../models/recipe.model';

@Component({
  selector: 'rb-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  constructor(private _router: Router,
              private _fileUploadService: FileUploadService,
              private _notificationService: NotificationService,
              private _recipeManager: RecipeManager) {

    this.isEditMode = _router.url.includes('edit');
    if(this.isEditMode) {
      this.control.is_private.disable();
    }
    this.checkRouteValidity();
  }

  control = {
    name: new FormControl(null, Validators.required),
    is_private: new FormControl(false),
    image_url: new FormControl(null, Validators.required),
    description: new FormControl(null),
    recipe: new FormControl(null, Validators.required),
    ingredients: new FormArray([], Validators.required),
  };
  recipeForm = new FormGroup(this.control);
  imageUploading = false;
  imageUploadProgress: number;
  isEditMode = false;
  updatedRecipe: Recipe;

  ngOnInit() {
    if (!this.isEditMode) {
      this.addIngredientControl();
    }
    this.handleActionStates();
  }

  addIngredientControl() {
    const ingredientFormGroup =  new FormGroup({
      name: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      unit: new FormControl(null)
    });
    this.control.ingredients.push(ingredientFormGroup);
  }

  removeIngredientControl(index: number) {
    if (this.control.ingredients.length === 1) {
      return;
    }
    this.control.ingredients.removeAt(index);
  }

  onFileSelected(event) {
    this.imageUploading = true;
    if (event.target.files[0]) {
      this._fileUploadService.uploadFile(event.target.files[0]).subscribe(value => {
        this.imageUploadProgress = value.progress;
        this.imageUploading = !value.is_complete;
        if (value.file_url) {
          this.control.image_url.patchValue(value.file_url);
        }
      });
    }
  }

  cancel() {
    this._recipeManager.closeRecipeEditForm();
    this._router.navigate(['dashboard/recipes']);
  }

  save() {
    this.isEditMode ?
      this._recipeManager.updateRecipe({...this.updatedRecipe, ...this.recipeForm.value}) :
      this._recipeManager.addRecipe(this.recipeForm.value);
  }

  checkRouteValidity() {
    if (this.isEditMode) {
      this._recipeManager.getEditedRecipe().subscribe(recipe => {
        if (recipe) {
          this.fillEditedRecipeForm(recipe);
        } else {
          this._router.navigate(['dashboard/recipes']);
        }
      });
    }
  }

  fillEditedRecipeForm(recipe: Recipe) {
    this.updatedRecipe = {...recipe};
    this.recipeForm.patchValue(recipe);
    this.control.ingredients.reset();
    recipe.ingredients.forEach(ingredient => {
      this.control.ingredients.push(new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        quantity: new FormControl(ingredient.quantity, Validators.required),
        unit: new FormControl(ingredient.unit || '')
      }));
    });
  }

  handleActionStates() {
    this._recipeManager.getActionState('recipeAdded').pipe(filter(i => !!i)).subscribe(_ => {
      this._notificationService.show('Recipe created successfully', 'success');
      this._router.navigate(['dashboard/recipes']);
    });
    this._recipeManager.getActionState('recipeUpdated').pipe(filter(i => !!i)).subscribe(_ => {
      this._notificationService.show('Recipe updated successfully', 'success');
      this._router.navigate(['dashboard/recipes']);
    });
  }
}
