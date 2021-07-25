import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {appReducer} from './store/app.reducer';
import {AuthEffects} from './modules/auth/store/effects/auth.effects';
import {SharedModule} from './modules/shared/shared.module';
import {CoreModule} from './modules/core/core.module';

const components = [AppComponent];
const modules = [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, BrowserAnimationsModule,
  NgxSpinnerModule, NgbModule, SharedModule, CoreModule,
  StoreModule.forRoot(appReducer),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([AuthEffects]),
  AngularFireModule.initializeApp(environment.firebaseConfig, 'recipe-book'),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  bootstrap: [AppComponent]
})
export class AppModule { }
