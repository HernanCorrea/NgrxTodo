import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { globalModules } from './shared/modules.module';
import { renderState } from './core/state/render.state';
import { ComponentsModule } from './shared/components/components.module';
import { AuthEffect } from './core/state/auth/auth.effects';

@NgModule({
  imports: [
    ...globalModules,
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(renderState),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
    }),
    AppRoutingModule,
  ],
  exports: [
    ...globalModules,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
