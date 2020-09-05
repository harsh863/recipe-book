import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AUTH_TOKEN} from '../../../shared/constants/local-storage.constant';

@Component({
  selector: 'rb-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    localStorage.removeItem(AUTH_TOKEN);
    this._router.navigate(['/']);
  }

}
