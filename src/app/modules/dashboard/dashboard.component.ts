import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-dashboard',
  template: `
    <rb-header></rb-header>
    <router-outlet></router-outlet>
  `
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
