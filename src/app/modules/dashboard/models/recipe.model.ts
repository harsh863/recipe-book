import {Ingredient} from './ingredient.model';

export interface Recipe {
  id?: string;
  name: string;
  is_private: boolean;
  image_url: string;
  description: string;
  recipe?: string; //TODO: change this to mandatory
  ingredients: Ingredient[];
  userId?: string;
  rating?: { [userId: string]: number };
}
