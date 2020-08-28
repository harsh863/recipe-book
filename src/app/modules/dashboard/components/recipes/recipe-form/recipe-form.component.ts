import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rb-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  control = {
    name: new FormControl(),
    is_private: new FormControl(false),
    image_url: new FormControl(),
    description: new FormControl(),
    ingredients: new FormArray([], Validators.required),
  };
  recipeForm = new FormGroup(this.control);

  ngOnInit() {
    this.addIngredientControl();
  }

  addIngredientControl() {
    const ingredientFormGroup =  new FormGroup({
      name: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      unit: new FormControl(null, [Validators.required])
    });
    this.control.ingredients.push(ingredientFormGroup);
  }

  removeIngredientControl(index: number) {
    if (this.control.ingredients.length === 1) {
      return;
    }
    this.control.ingredients.removeAt(index);
  }


  onFileSelected(event: any, image: HTMLImageElement) {
    console.log(event.target.files[0].name);
    image.src = event.target.files[0].name;
  }

  cancel() {
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }
}
