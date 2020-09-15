import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthManager} from '../../managers/auth.manager';
import {filter, take} from 'rxjs/operators';
import {NotificationService} from '../../../shared/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _authManager: AuthManager,
              private _notificationService: NotificationService) { }

  control = {
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  };
  signupForm = new FormGroup(this.control);
  loading = this._authManager.selectSignUpState('signingUp');

  ngOnInit() {
    this.handleSignUpState();
  }

  signUp = () => {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this._authManager.signUp(this.control.email.value, this.control.password.value, this.control.username.value)
  }

  registerWithGoogle = () => this._authManager.authenticateWithGoogle()

  handleSignUpState() {
    this._authManager.selectSignUpState('signUpSuccess').pipe(filter(v => !!v))
      .subscribe(_ => {
        this._notificationService.show(`We have sent you an confirmation link to ${this.control.email.value}. Please verify it to continue further`, 'success');
        this.signupForm.reset();
      });

    this._authManager.selectSignUpState('signUpFailed').pipe(filter(v => !!v)).subscribe(async _ => {
      const errorMessage = await this._authManager.getErrorMessage().pipe(take(1)).toPromise();
      this._notificationService.show(errorMessage, 'error');
    });
  }

}
