import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AnonymousGuard} from '../../guards/anonymous.guard';
import {AuthGuard} from '../../guards/auth.guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    canActivate: [AnonymousGuard] ,children: [
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'forgot-password', component: ForgotPasswordComponent
      },
    ]
  },
  {
    path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
