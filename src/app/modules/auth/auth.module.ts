import { NgModule } from '@angular/core';

import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {AuthEffects} from './store/effects/auth.effects';
import {AuthManager} from './managers/auth.manager';

const modules = [AuthRoutingModule, SharedModule];
const components = [AuthComponent, LoginComponent, SignupComponent, LogoutComponent, ForgotPasswordComponent];
const managers = [AuthManager];
const effects = [AuthEffects];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...managers, ...effects]
})
export class AuthModule { }
