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

  control = {
    name: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unit: new FormControl(null)
  };
  filterControl = new FormControl(null);

  ingredients: Ingredient[] = [
    {name: 'Apple', quantity: 2, unit: 'kgs'},
    {name: 'Apple', quantity: 2, unit: 'kgs'},
  ];

  isFilterBarVisible = false;

  ngOnInit() {
  }

}
