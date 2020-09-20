import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'rb-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.scss']
})
export class RecipesHomeComponent implements OnInit {

  constructor(private _router: Router) { }

  isPrivateMode = false;
  filterControl = new FormControl();

  ngOnInit() {
  }

  toggleViewMode(value: boolean) {
    this.isPrivateMode = value;
    this.filterControl.reset();
    console.log(value, this.isPrivateMode);
  }

  createNewRecipe() {
    this._router.navigate(['dashboard/recipes/new']);
  }
}
