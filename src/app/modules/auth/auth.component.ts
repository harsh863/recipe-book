import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'rb-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {

  constructor() { }
  activeCardIndex = 1;
  carouselIndicators = [1, 2, 3, 4, 5];
  isDesktopMode = true;
  hideWelcomeWindow = false;
  openMainBlock = false;  // this is just for UI effects

  ngOnInit() {
    this.onResize();
    this.startCarousel();
  }

  onResize() {
    this.isDesktopMode = window.innerWidth > 600;
    if (this.isDesktopMode) {
      this.hideWelcomeWindow = false;
    }
    this.carouselIndicators = this.isDesktopMode ? [1, 2, 3, 4, 5] : [];
  }

  navigateToLogin() {
    this.openMainBlock = true;
    setTimeout(_ => document.querySelector('.main-block').scrollIntoView({behavior: 'smooth'}));
    setTimeout(_ => {
      this.hideWelcomeWindow = true;
      this.openMainBlock = false;
      }, 500);
  }

  startCarousel() {
    // @ts-ignore
    $('.carousel').carousel({
      interval: 3000
    });
  }

  ngAfterViewInit() {
    document.querySelector('.carousel').scrollIntoView({behavior: 'auto'});
  }

}
