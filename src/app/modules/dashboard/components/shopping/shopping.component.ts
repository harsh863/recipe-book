import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Ingredient} from '../../models/ingredient.model';

@Component({
  selector: 'rb-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor() { }
  filterControl = new FormControl(null);

  isFilterBarVisible = false;

  ngOnInit() {
  }

}
