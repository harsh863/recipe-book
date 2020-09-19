import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ShoppingService} from '../../services/shopping.service';

@Component({
  selector: 'rb-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor(private cre: ShoppingService) { }
  filterControl = new FormControl(null);

  isFilterBarVisible = false;

  ngOnInit() {
    this.cre.fetchIngredients().subscribe(x => console.log(x));
  }

}
