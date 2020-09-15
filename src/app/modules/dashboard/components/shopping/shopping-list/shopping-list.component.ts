import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor() { }
  ingredients: Ingredient[] = [
    {name: 'Apple', quantity: 2, unit: 'kgs'},
    {name: 'Mango', quantity: 2, unit: 'kgs'},
  ];

  ngOnInit() {
  }

}
