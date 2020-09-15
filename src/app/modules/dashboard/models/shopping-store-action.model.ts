import {ShoppingStoreActions} from '../enums/shopping-store-actions.enum';

export interface ShoppingStoreAction {
  type: ShoppingStoreActions,
  payload?: any;
}
