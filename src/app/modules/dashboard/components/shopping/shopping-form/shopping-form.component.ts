import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShoppingManager} from '../../../managers/shopping.manager';
import {filter, takeUntil} from 'rxjs/operators';
import {NotificationService} from '../../../../shared/services/notification.service';
import {Ingredient} from '../../../models/ingredient.model';
import {UnsubscribeAbstract} from '../../../../shared/components/unsubscribe/unsubscribe.component';

@Component({
  selector: 'rb-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss']
})
export class ShoppingFormComponent extends UnsubscribeAbstract implements OnInit {

  constructor(private _shoppingManager: ShoppingManager,
              private _notificationService: NotificationService) {
    super();
  }

  control = {
    name: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    unit: new FormControl(null)
  };
  editMode = false;
  editedIngredient: Ingredient;
  loading = false;

  ingredientForm = new FormGroup(this.control);

  ngOnInit() {
    this._shoppingManager.selectEditedIngredient().pipe(takeUntil(this.destroyed$)).subscribe(ingredient => {
      if (ingredient) {
        this.editMode = true;
        this.editedIngredient = {...ingredient};
        this.ingredientForm.patchValue(ingredient);
      } else {
        this.cancelUpdate();
      }
    })
    this.handleActionStates();
  }

  checkClearButtonValidity() {
    return (this.control.name.value || this.control.quantity.value || this.control.unit.value);
  }

  addIngredient() {
    this.loading = true;
    this._shoppingManager.addIngredient(this.ingredientForm.value);
  }

  updateIngredient() {
    this.loading = true;
    this._shoppingManager.updateIngredient({...this.editedIngredient, ...this.ingredientForm.value});
  }

  handleActionStates() {
    this._shoppingManager.getActionState('ingredientAdded').pipe(filter(i => !!i), takeUntil(this.destroyed$)).subscribe(_ => {
      this._notificationService.show('Ingredient added successfully', 'success');
      this.ingredientForm.reset();
      this.loading = false;
    });
    this._shoppingManager.getActionState('ingredientUpdated').pipe(filter(i => !!i), takeUntil(this.destroyed$)).subscribe(_ => {
      this._notificationService.show('Ingredient updated successfully', 'success');
      this.cancelUpdate();
    });
  }

  cancelUpdate(dispatchAction  = false) {
    this.ingredientForm.reset();
    this.editMode = false;
    this.editedIngredient = null;
    this.loading = false;
    if (dispatchAction) {
      this._shoppingManager.stopEditIngredient();
    }
  }
}
