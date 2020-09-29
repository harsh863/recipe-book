import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {NotificationService} from '../../../core/services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'rb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _notificationService: NotificationService,
              private _router: Router) { }

  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  loading = false;

  ngOnInit() {
  }

  sendResetEmail() {
    this.loading = true;
    this._authService.sendPasswordResetEmail(this.emailControl.value).subscribe(_ => {
      this.loading = false;
      this._notificationService.show(`A password reset email has been sent to ${this.emailControl.value}. Please check it for further instructions`, 'success');
      this.emailControl.reset();
      this._router.navigate(['auth/login']);
    }, error => {
      this.loading = false;
      this._notificationService.show(error.message, 'error');
    });
  }

}
