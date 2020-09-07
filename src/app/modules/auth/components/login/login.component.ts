import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'rb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  control = {
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  };
  loginForm = new FormGroup(this.control);
  loading = false;

  constructor(private _router: Router,
              private _authService: AuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.loading = true;
    this._authService.signIn(this.control.email.value, this.control.password.value).subscribe(_ => {
      this.loading = false;
      this.loginForm.reset();
    });
  }

  signInWithGoogle() {
    this._authService.googleAuth().subscribe(user => console.log(user));
  }

  goToForgotPassword() {
    this._router.navigate(['auth/forgot-password']);
  }
}
