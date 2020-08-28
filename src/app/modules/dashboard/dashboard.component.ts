import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-dashboard',
  template: `
    <rb-header></rb-header>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
