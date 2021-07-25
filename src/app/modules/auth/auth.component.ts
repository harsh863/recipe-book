import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {PlatformService} from '../core/services/platform.service';

@Component({
  selector: 'rb-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  activeCardIndex = 1;
  carouselIndicators = [1, 2, 3, 4, 5];
  isDesktopMode = true;
  hideWelcomeWindow = false;
  isSignupMode = true;
  openMainBlock = false;  // this is just for UI effects

  constructor(private _router: Router,
              private _platformService: PlatformService) {
    _router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.isSignupMode = _router.url.includes('signup');
        if (this._platformService.isRunningOnBrowser()) { document.body.scrollIntoView({behavior: 'auto'}); }
      }
    });
  }

  ngOnInit() {
    this.onResize();
    this.startCarousel();
  }

  onResize() {
    if (this._platformService.isRunningOnServer()) return;

    this.isDesktopMode = window.innerWidth > 600;
    if (this.isDesktopMode) {
      this.hideWelcomeWindow = false;
    }
    this.carouselIndicators = this.isDesktopMode ? [1, 2, 3, 4, 5] : [];
  }

  navigateToLogin() {
    if (this._platformService.isRunningOnServer()) return;

    this.openMainBlock = true;
    setTimeout(_ => document.querySelector('.main-block').scrollIntoView({behavior: 'smooth'}));
    setTimeout(_ => {
      this.hideWelcomeWindow = true;
      this.openMainBlock = false;
      }, 500);
  }

  startCarousel() {
    if (this._platformService.isRunningOnServer()) return;

    // @ts-ignore
    $(document).ready(function(){
      // @ts-ignore
      $('.carousel').carousel({
        interval: 3000
      })
    });
  }

  ngAfterViewInit() {
    if (this._platformService.isRunningOnServer()) return;

    document.querySelector('.carousel').scrollIntoView({behavior: 'auto'});
  }

}
