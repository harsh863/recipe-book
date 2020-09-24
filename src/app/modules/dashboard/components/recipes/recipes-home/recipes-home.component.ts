import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'rb-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.scss']
})
export class RecipesHomeComponent implements OnInit {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    _activatedRoute.queryParams.subscribe(queryParams => {
      this.isPrivateMode = !!queryParams.is_private;
    });
  }

  isPrivateMode = false;
  filterControl = new FormControl();

  ngOnInit() {
  }

  toggleViewMode(value: boolean) {
    if (value) {
      this._router.navigate(['dashboard/recipes'], {queryParams: {is_private: true}})
    } else {
      this._router.navigate(['dashboard/recipes'])
    }
    this.filterControl.reset();
  }

  createNewRecipe() {
    this._router.navigate(['dashboard/recipes/new']);
  }
}
