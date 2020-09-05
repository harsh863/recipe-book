import {Component} from '@angular/core';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'dl-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent{

  drawerControl = new FormControl(false);

  constructor(private _router: Router) { }

  openLink(path: string) {
    setTimeout(_ => {
      this._router.navigate([path])
        .then(_ => this.drawerControl.setValue(false));
    }, 300);
  }
}
