import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  isDesktopMode = true;

  ngOnInit() {
    this.onResize();
  }

  onResize() {
    this.isDesktopMode = window.innerWidth > 600;
  }

  async goToRecipes() {
    const queryParams = await this._activatedRoute.queryParams.pipe(take(1)).toPromise();
    this._router.navigate(['dashboard/recipes'], {queryParams});
  }
}
