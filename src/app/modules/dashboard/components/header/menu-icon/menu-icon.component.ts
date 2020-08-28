import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'dl-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {

  isDrawerVisible = false;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  openLink(path: string) {
    setTimeout(_ => {
      this._router.navigate([path], {relativeTo: this._activatedRoute})
        .then(_ => this.isDrawerVisible = false);
    }, 1000);
  }
}
