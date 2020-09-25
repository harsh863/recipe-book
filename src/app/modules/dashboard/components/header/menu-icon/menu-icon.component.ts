import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {delay, take} from 'rxjs/operators';

@Component({
  selector: 'dl-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent{

  drawerControl = new FormControl(false);

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  openLink(path: string) {
    setTimeout(_ => {
      this._router.navigate([path])
        .then(_ => this.drawerControl.setValue(false));
    }, 300);
  }

  async goToRecipes() {
    const queryParams = await this._activatedRoute.queryParams.pipe(delay(300), take(1)).toPromise();
    this._router.navigate(['dashboard/recipes'], {queryParams})
      .then(_ => this.drawerControl.setValue(false));
  }
}
