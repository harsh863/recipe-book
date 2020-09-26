import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoggedInUserManager} from './managers/logged-in-user.manager';
import {AuthService} from './services/auth.service';
import {LoggedInUserResolver} from './resolvers/logged-in-user.resolver';
import {NotificationService} from './services/notification.service';
import {SharedModule} from '../shared/shared.module';

const services = [AuthService, NotificationService];
const managers = [LoggedInUserManager];
const resolvers = [LoggedInUserResolver];
@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [...services, ...managers, ...resolvers],
})
export class CoreModule { }
