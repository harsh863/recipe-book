import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'rb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  loading = false;

  ngOnInit() {
  }

  sendResetEmail() {
    this.loading = true;
    this._authService.sendPasswordResetEmail(this.emailControl.value).subscribe(_ => {
      this.loading = false;
      this.emailControl.reset();
    });
  }

}
