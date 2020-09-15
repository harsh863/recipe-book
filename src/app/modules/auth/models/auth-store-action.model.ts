import {AuthStoreActions} from '../enums/auth-store-actions.enum';

export interface AuthStoreAction {
  type: AuthStoreActions,
  payload?: any;
}
