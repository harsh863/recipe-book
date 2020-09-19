import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {RandomSpinnerUtils} from './utils/random-spinner.utils';
import {RandomColorUtils} from './utils/random-color.utils';

@Component({
  selector: 'rb-root',
  template: `
    <router-outlet></router-outlet>
    <ngx-spinner
      *ngIf="loading"
      bdColor="rgba(255, 255, 255, 1)"
      size="medium"
      [type]="spinner"
      [color]="color">
      <p [ngStyle]="{'color': color}">Please wait!!, while we are building your store...</p>
    </ngx-spinner>`,
})
export class AppComponent {
  timer: any;
  spinner = RandomSpinnerUtils.getRandomSpinner();
  color = RandomColorUtils.getRandomColor();
  loading = false;

  constructor(private _router: Router, private _spinner: NgxSpinnerService) {
    this._spinner.show();
    _router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    RandomSpinnerUtils.getRandomSpinner();
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    } else if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}
