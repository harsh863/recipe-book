import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'rb-recipes-home',
  templateUrl: './recipes-home.component.html',
  styleUrls: ['./recipes-home.component.scss']
})
export class RecipesHomeComponent implements OnInit {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  isPrivateMode = false;
  isDropdownExpanded = false;

  ngOnInit() {
  }

  toggleDropdown() {
    this.isDropdownExpanded = !this.isDropdownExpanded;
  }

  toggleViewMode(value: boolean) {
    this.isPrivateMode = value;
    this.isDropdownExpanded = false;
  }

  createNewRecipe() {
    this._router.navigate(['new'], {relativeTo: this._activatedRoute});
  }
}
