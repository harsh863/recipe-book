import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {AuthService} from './services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {AuthEffects} from './store/effects/auth.effects';
import {AuthManager} from './managers/auth.manager';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent, LogoutComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AuthService, AngularFirestore, AngularFireAuth, AuthEffects, AuthManager]
})
export class AuthModule { }
