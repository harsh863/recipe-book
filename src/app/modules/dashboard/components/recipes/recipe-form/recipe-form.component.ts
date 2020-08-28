import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FileUploadService} from '../../../services/file-upload.service';

@Component({
  selector: 'rb-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _fileUploadService: FileUploadService) { }

  control = {
    name: new FormControl(null, Validators.required),
    is_private: new FormControl(false),
    image_url: new FormControl(),
    description: new FormControl(),
    ingredients: new FormArray([], Validators.required),
  };
  recipeForm = new FormGroup(this.control);
  uploading = false;
  fileUploadProgress: number;

  ngOnInit() {
    this.addIngredientControl();
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
    this.uploading = true;
    if (event.target.files[0]) {
      this._fileUploadService.uploadFile(event.target.files[0]).subscribe(value => {
        this.fileUploadProgress = value.progress;
        this.uploading = !value.is_complete;
        if (value.file_url) {
          this.control.image_url.patchValue(value.file_url);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this._router.navigate(['../'], {relativeTo: this._activatedRoute});
  }
}
