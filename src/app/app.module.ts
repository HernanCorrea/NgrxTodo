import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { renderState } from './core/state/render.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { globalModules } from './shared/modules.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(renderState),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutingModule,
    ...globalModules
  ],
  exports: [
    ...globalModules
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
