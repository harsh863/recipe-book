import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../../models/recipe.model';
import {ModalService} from '../../../../services/modal.service';
import {RecipePreviewComponent} from '../../recipe-preview/recipe-preview.component';
import {RecipeManager} from '../../../../managers/recipe.manager';
import {LoggedInUserManager} from '../../../../../auth/managers/logged-in-user.manager';
import {filter, takeUntil} from 'rxjs/operators';
import {NotificationService} from '../../../../../shared/services/notification.service';
import {UnsubscribeAbstract} from '../../../../../shared/components/unsubscribe/unsubscribe.component';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent extends UnsubscribeAbstract implements OnInit {

  @Input() recipe: Recipe;
  loggedInUserId: string;
  isRated = false;

  constructor(private _modalService: ModalService,
              private _recipeManager: RecipeManager,
              private _notificationService: NotificationService,
              private _loggedInUserManager: LoggedInUserManager) {
    super();
    this._loggedInUserManager.selectLoggedInUser().subscribe(user => this.loggedInUserId = user.id);
  }

  ngOnInit() {
    this._recipeManager.getActionState('recipeUpdated').pipe(filter(i => !!i && this.isRated), takeUntil(this.destroyed$)).subscribe(_ => {
      this._notificationService.show('Your response has been recorded successfully', 'success');
      this.isRated = false;
    });
  }

  getRecipeRating(rating: Recipe['rating']): number {
    const ratings = Object.values(rating || {});
    return ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
  }

  getTotalReviews(rating: Recipe['rating']): number {
    return Object.values(rating || {}).length;
  }

  openRecipe() {
    this._modalService.open(RecipePreviewComponent, [{key: 'recipe', value: this.recipe}])
  }

  rateRecipe(event: MouseEvent, rating: number) {
    event.stopPropagation();
    const updatedRecipe = {...this.recipe};
    updatedRecipe.rating = {...(updatedRecipe.rating || {}), [this.loggedInUserId]: rating };
    this.isRated = true;
    this._recipeManager.updateRecipe(updatedRecipe);
  }
}
