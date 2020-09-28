import {ComponentRef} from '@angular/core';
import {SnackbarComponent} from '../modules/shared/components/snackbar/snackbar.component';

export class ReferenceUtils {

  static OnlineStatusNotification: ComponentRef<SnackbarComponent>;

  static OfflineStatusNotification: ComponentRef<SnackbarComponent>;

  static LoadingSpinner: string;
}
