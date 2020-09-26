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
import {LoggedInUserResolver} from './modules/auth/resolvers/logged-in-user.resolver';
import {LoggedInUserManager} from './modules/auth/managers/logged-in-user.manager';
import {SharedModule} from './modules/shared/shared.module';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {RecipeService} from './modules/dashboard/services/recipe.service';
import {AngularFireDatabase} from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    BrowserAnimationsModule,
    NgxSpinnerModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({logOnly: !environment.production}),
    EffectsModule.forRoot([AuthEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'recipe-book'),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
  ],
  providers: [AuthService, AngularFireAuth,LoggedInUserResolver, RecipeService, AngularFireDatabase, LoggedInUserManager, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
