import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {RandomSpinnerUtils} from './utils/random-spinner.utils';
import {RandomColorUtils} from './utils/random-color.utils';
import {ReferenceUtils} from './utils/reference.utils';
import {NotificationService} from './modules/core/services/notification.service';
import {noop} from 'rxjs';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  spinner = ReferenceUtils.LoadingSpinner || RandomSpinnerUtils.getRandomSpinner();
  color = RandomColorUtils.getRandomColor();

  constructor(private _router: Router,
              private _spinner: NgxSpinnerService,
              private _notificationService: NotificationService) {
    this.handleConnectivityStatus();
    console.clear();
    _router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      if (!ReferenceUtils.LoadingSpinner) {
        this._spinner.show();
        ReferenceUtils.LoadingSpinner = this.spinner;
      }
    } else if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      ReferenceUtils.LoadingSpinner = null;
      this._spinner.hide();
    }
  }

  handleConnectivityStatus() {
    // this is to check connectivity status when app reloads
    navigator.onLine ? noop() : this.onOffline();

    // these events will listen changes the after app gets initialized
    window.addEventListener('online', this.onOnline.bind(this));

    window.addEventListener('offline', this.onOffline.bind(this));
  }

  onOnline() {
    if (ReferenceUtils.OfflineStatusNotification) {
      this._notificationService.closeNotification(ReferenceUtils.OfflineStatusNotification);
      ReferenceUtils.OfflineStatusNotification = null;
    }
    if (!ReferenceUtils.OnlineStatusNotification) {
      ReferenceUtils.OnlineStatusNotification = this._notificationService.show('Your internet connection is back', 'success');
    }
  }

  onOffline() {
    if (ReferenceUtils.OnlineStatusNotification) {
      this._notificationService.closeNotification(ReferenceUtils.OnlineStatusNotification);
      ReferenceUtils.OnlineStatusNotification = null;
    }
    if (!ReferenceUtils.OfflineStatusNotification) {
      ReferenceUtils.OfflineStatusNotification = this._notificationService.show("Your internet connection is down", 'warn', false);
    }
  }
}
