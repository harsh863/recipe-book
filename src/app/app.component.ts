import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {RandomSpinnerUtils} from './utils/random-spinner.utils';
import {RandomColorUtils} from './utils/random-color.utils';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  providers: [NgxSpinnerService]
})
export class AppComponent {
  spinner = RandomSpinnerUtils.getRandomSpinner();
  color = RandomColorUtils.getRandomColor();

  constructor(private _router: Router,
              private _spinner: NgxSpinnerService) {
    _router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this._spinner.show();
    } else if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this._spinner.hide();
    }
  }
}
