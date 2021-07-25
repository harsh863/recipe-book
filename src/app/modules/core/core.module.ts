import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoggedInUserManager} from './managers/logged-in-user.manager';
import {AuthService} from './services/auth.service';
import {LoggedInUserResolver} from './resolvers/logged-in-user.resolver';
import {NotificationService} from './services/notification.service';
import {SharedModule} from '../shared/shared.module';
import {PlatformService} from './services/platform.service';

const services = [AuthService, NotificationService, PlatformService];
const managers = [LoggedInUserManager];
const resolvers = [LoggedInUserResolver];
const modules = [CommonModule, SharedModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  providers: [...services, ...managers, ...resolvers],
})
export class CoreModule { }
