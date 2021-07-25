import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {ClickOutsideModule} from 'ng-click-outside';

import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './components/recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { RecipesHomeComponent } from './components/recipes/recipes-home/recipes-home.component';
import { MenuIconComponent } from './components/header/menu-icon/menu-icon.component';
import {RecipeService} from './services/recipe.service';
import {FileUploadService} from './services/file-upload.service';
import { RecipePreviewComponent } from './components/recipes/recipe-preview/recipe-preview.component';
import {SharedModule} from '../shared/shared.module';
import {ShoppingService} from './services/shopping.service';
import { ShoppingFormComponent } from './components/shopping/shopping-form/shopping-form.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import {RecipeManager} from './managers/recipe.manager';
import {RecipeEffects} from './store/effects/recipe.effect';
import {RecipeResolver} from './resolvers/recipe.resolver';
import {ModalService} from './services/modal.service';
import {ShoppingEffects} from './store/effects/shopping.effect';
import {ShoppingManager} from './managers/shopping.manager';
import { ShoppingItemComponent } from './components/shopping/shopping-list/shopping-item/shopping-item.component';
import {ShoppingResolver} from './resolvers/shopping.resolver';

const modules = [DashboardRoutingModule, SharedModule, ClickOutsideModule,
  NgbRatingModule, EffectsModule.forFeature([RecipeEffects, ShoppingEffects])
];
const components = [DashboardComponent, HeaderComponent, MenuIconComponent,
  RecipesComponent, RecipesHomeComponent, RecipesListComponent,
  RecipeItemComponent, RecipePreviewComponent, RecipeFormComponent,
  ShoppingComponent, ShoppingFormComponent, ShoppingListComponent, ShoppingItemComponent
];
const services = [RecipeService, ShoppingService, FileUploadService, ModalService];
const managers = [RecipeManager, ShoppingManager];
const effects = [ShoppingEffects, RecipeEffects];
const resolvers = [RecipeResolver, ShoppingResolver];
const entryComponents = [RecipePreviewComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  entryComponents: [...entryComponents],
  providers: [...services, ...managers, ...effects, ...resolvers]
})
export class DashboardModule { }
