import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {RecipesComponent} from './components/recipes/recipes.component';
import {RecipeFormComponent} from './components/recipes/recipe-form/recipe-form.component';
import {ShoppingComponent} from './components/shopping/shopping.component';
import {RecipesHomeComponent} from './components/recipes/recipes-home/recipes-home.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'recipes', pathMatch: 'full',
      },
      {
        path: 'recipes', component: RecipesComponent, children: [
          {
            path: '', component: RecipesHomeComponent
          },
          {
            path: 'new', component: RecipeFormComponent
          },
          {
            path: 'edit', component: RecipeFormComponent
          }
        ]
      },
      {
        path: 'shopping-list', component: ShoppingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
