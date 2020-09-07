import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  control = {
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  };
  signupForm = new FormGroup(this.control);
  loading = false;

  ngOnInit() {
  }

  signUp() {
    this._authService.signUp(this.control.email.value, this.control.password.value, this.control.username.value).subscribe(val => {
      console.log(val);
    }, error => {
      console.log(error, 1);
    });
  }

  registerWithGoogle() {
    this.loading = true;
    this._authService.googleAuth().subscribe(_ => {
      this.loading = false;
      this.signupForm.reset();
    });
  }

}
