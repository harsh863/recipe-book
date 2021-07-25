import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const modules = [AppModule, ServerModule];

@NgModule({
  imports: [...modules],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
