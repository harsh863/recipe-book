import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  isDesktopMode = true;

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    this.isDesktopMode = window.innerWidth > 600;
  }

}
