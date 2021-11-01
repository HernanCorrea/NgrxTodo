import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { globalModules } from './shared/modules.module';
import { counterReducer } from './core/state/counter/counter.reducer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({count: counterReducer}),
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
