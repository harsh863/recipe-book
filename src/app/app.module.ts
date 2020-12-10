import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './modules/auth/store/effects/auth.effects';
import {SharedModule} from './modules/shared/shared.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './modules/core/core.module';
import {NetworkStatusAngularModule} from 'network-status-angular';

const components = [AppComponent];
const modules = [BrowserModule, AppRoutingModule, BrowserAnimationsModule,
  NgxSpinnerModule, NgbModule, SharedModule, CoreModule,
  StoreModule.forRoot(appReducer),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([AuthEffects]),
  NetworkStatusAngularModule.forRoot(),
  AngularFireModule.initializeApp(environment.firebaseConfig, 'recipe-book'),
  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  bootstrap: [AppComponent]
})
export class AppModule { }
