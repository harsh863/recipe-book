import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {RecipeService} from '../../../services/recipe.service';

@Component({
  selector: 'rb-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  constructor(private _recipeService: RecipeService) { }

  @Input() isPrivateMode: boolean;
  @Input() filterValue: string;

  recipes: Recipe[] = [
    {name: 'One Pot Thai-Style Rice Noodles', image_url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3949345.jpg&w=272&h=272&c=sc&poi=face&q=85'
      , description: 'Chicken, vegetables, and noodles prepared in a light tasting but full-flavored Asian-inspired sauce.', userId: 'vreger', ingredients: [], is_private: true, id: '1'},
    {name: 'One Pot Thai-Style Rice Noodles', image_url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3949345.jpg&w=272&h=272&c=sc&poi=face&q=85'
      , description: 'Chicken, vegetables, and noodles prepared in a light tasting but full-flavored Asian-inspired sauce.', userId: 'vreger', ingredients: [], is_private: true, id: '2'},
    {name: 'One Pot Thai-Style Rice Noodles', image_url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3949345.jpg&w=272&h=272&c=sc&poi=face&q=85'
      , description: 'Chicken, vegetables, and noodles prepared in a light tasting but full-flavored Asian-inspired sauce.', userId: 'vreger', ingredients: [], is_private: true, rating: 1, id: '3'}
  ];

  // recipes: Recipe[] = [];

  ngOnInit() {
  }

}
