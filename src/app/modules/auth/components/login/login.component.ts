import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthManager} from '../../managers/auth.manager';
import {NotificationService} from '../../../shared/services/notification.service';
import {filter, take, takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../../shared/components/unsubscribe/unsubscribe.component';

@Component({
  selector: 'rb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends UnsubscribeAbstract implements OnInit {

  constructor(private _router: Router,
              private _notificationService: NotificationService,
              private _authManager: AuthManager) {
    super();
  }

  control = {
    email: new FormControl('test@test.com', [Validators.required, Validators.email]),
    password: new FormControl('secret', [Validators.required, Validators.minLength(6)])
  };
  loginForm = new FormGroup(this.control);
  loading = this._authManager.selectLoginState('loggingIn');

  ngOnInit() {
    this.handleLoginState();
  }

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this._authManager.login(this.control.email.value, this.control.password.value);
  }

  signInWithGoogle() {
    this._authManager.authenticateWithGoogle();
  }

  goToForgotPassword() {
    this._router.navigate(['auth/forgot-password']);
  }

  handleLoginState() {
    this._authManager.selectLoginState('logInSuccess').pipe(filter(v => !!v), takeUntil(this.destroyed$)).subscribe(_ => {
      this.loginForm.reset();
      this._router.navigate(['dashboard']);
    });
    this._authManager.selectLoginState('logInFailed').pipe(filter(v => !!v), takeUntil(this.destroyed$)).subscribe(async _ => {
      const errorMessage = await this._authManager.getErrorMessage().pipe(take(1)).toPromise();
      this._notificationService.show(errorMessage, 'error');
    });
  }
}
