import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './modules/store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './modules/auth/store/effects/auth.effects';
import {AuthService} from './modules/auth/services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'recipe-book'),
  ],
  providers: [AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
