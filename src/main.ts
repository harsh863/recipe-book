import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as firebase from 'firebase';

if (environment.production) {
  enableProdMode();
}

export const firebaseInstance = firebase.initializeApp(environment.firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

document.addEventListener('contextmenu', event => event.preventDefault());
