import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './components/recipes/recipes-list/recipe-item/recipe-item.component';
import {HttpClientModule} from '@angular/common/http';
import { RecipeFormComponent } from './components/recipes/recipe-form/recipe-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { RecipesHomeComponent } from './components/recipes/recipes-home/recipes-home.component';
import { MenuIconComponent } from './components/header/menu-icon/menu-icon.component';
import {RecipeService} from './services/recipe.service';
import {FileUploadService} from './services/file-upload.service';

const components = [DashboardComponent, HeaderComponent, RecipesComponent,
  RecipesListComponent, RecipeItemComponent, RecipeFormComponent];
const modules = [CommonModule, DashboardRoutingModule, HttpClientModule,
  FormsModule, ReactiveFormsModule];
const services = [RecipeService, FileUploadService];

@NgModule({
  declarations: [...components, ShoppingComponent, RecipesHomeComponent, MenuIconComponent],
  imports: [...modules],
  providers: [...services]
})
export class DashboardModule { }
