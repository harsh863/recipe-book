import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {ShoppingManager} from '../../../managers/shopping.manager';
import {noop} from 'rxjs';
import {NotificationService} from '../../../../shared/services/notification.service';
import {filter, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {RandomColorUtils} from '../../../../../utils/random-color.utils';
import {UnsubscribeAbstract} from '../../../../shared/components/unsubscribe/unsubscribe.component';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent extends UnsubscribeAbstract implements OnInit {

  constructor(private _shoppingManager: ShoppingManager,
              private _notificationService: NotificationService) {
    super();
  }

  filterControl = new FormControl(null);
  ingredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  ingredientCheckSheet: {[id: string]: boolean} = {};
  selectedIngredientsCount = 0;
  deleting = false;
  loading = true;
  previousIngredientsCount: number;
  randomColor = RandomColorUtils.getRandomColor();


  ngOnInit() {
    this._shoppingManager.selectIngredients().pipe(takeUntil(this.destroyed$)).subscribe(ingredients => {
      this.loading = false;
      this.ingredients = [...ingredients];
      this.filteredIngredients = [...ingredients];
    });
    this.handleActionStates();
    this.filterControl.valueChanges.subscribe(value => this.filterIngredients(value));
  }

  onIngredientSelect(value: boolean, ingredientId: string) {
    this.ingredientCheckSheet[ingredientId] = value;
    Object.entries(this.ingredientCheckSheet).forEach(([key, value]) => {
      !value ? delete this.ingredientCheckSheet[key] : noop();
    });
    this.selectedIngredientsCount = Object.keys(this.ingredientCheckSheet).length;
  }

  deleteIngredients() {
    this.deleting = true;
    this.previousIngredientsCount = this.ingredients.length;
    const ingredientsIds = Object.keys(this.ingredientCheckSheet).length > 0 ?
      Object.keys(this.ingredientCheckSheet) : this.ingredients.map(ingredient => ingredient.id);
    this._shoppingManager.deleteIngredients(ingredientsIds);
  }

  handleActionStates() {
    this._shoppingManager.getActionState('ingredientsDeleted').pipe(filter(i => !!i), takeUntil(this.destroyed$)).subscribe(_ => {
      this.deleting = false;
      this.selectedIngredientsCount = 0;
      this._notificationService.show(`${Object.keys(this.ingredientCheckSheet).length > 0 && Object.keys(this.ingredientCheckSheet).length !== this.previousIngredientsCount ? 'Selected' : 'All'} ingredients removed successfully`, 'success');
      this.ingredientCheckSheet = {};
    });
  }

  filterIngredients(value: string) {
    this.filteredIngredients = this.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes((value + '').toLowerCase()));
  }
}
