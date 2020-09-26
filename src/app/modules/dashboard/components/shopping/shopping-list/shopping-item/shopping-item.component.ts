import {Component, Input, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../../../models/ingredient.model';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {ShoppingManager} from '../../../../managers/shopping.manager';
import {NotificationService} from '../../../../../shared/services/notification.service';
import {filter, takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../../../../shared/components/unsubscribe/unsubscribe.component';

@Component({
  selector: 'rb-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent extends UnsubscribeAbstract implements OnInit {

  constructor(private _shoppingManager: ShoppingManager,
              private _notificationService: NotificationService) {
    super();
  }

  @Output() onIngredientSelect = new Subject<boolean>();
  @Input() ingredient: Ingredient;
  @Input() ingredientIndex: number;

  control: FormControl = new FormControl(false);
  deleting = false;

  ngOnInit() {
    this.control.valueChanges.subscribe(value => this.onIngredientSelect.next(value));
    this.handleActionStates();
  }

  deleteIngredient() {
    this.deleting = true;
    this.control.disable();
    this._shoppingManager.deleteIngredient(this.ingredient.id);
  }

  updateIngredient() {
    this._shoppingManager.startEditIngredient(this.ingredient);
  }

  handleActionStates() {
    this._shoppingManager.getActionState('ingredientDeleted').pipe(filter(i => !!i && this.deleting), takeUntil(this.destroyed$)).subscribe(_ => {
      this.deleting = false;
      this.onIngredientSelect.next(false);
      this._notificationService.show('Ingredient removed successfully', 'success');
    });
  }

}
