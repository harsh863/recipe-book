import { Component, OnInit } from '@angular/core';
import {AuthManager} from '../../managers/auth.manager';

@Component({
  selector: 'rb-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private _authManager: AuthManager) { }

  ngOnInit() {
    this._authManager.logout();
  }

}
