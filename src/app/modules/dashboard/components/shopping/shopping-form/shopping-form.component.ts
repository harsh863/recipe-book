import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShoppingService} from '../../../services/shopping.service';

@Component({
  selector: 'rb-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent implements OnInit {

  constructor(private cre: ShoppingService) { }

  control = {
    name: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unit: new FormControl(null)
  };

  ingredientForm = new FormGroup(this.control);

  ngOnInit() {
  }

  checkClearButtonValidity() {
    return (this.control.name.value || this.control.quantity.value || this.control.unit.value);
  }

  addIngredient() {
    this.cre.addIngredient(this.ingredientForm.value).subscribe(i => console.log(i,1));
  }
}
