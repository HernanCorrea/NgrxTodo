import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { globalModules } from 'src/app/shared/modules.module';
import { AuthEffect } from 'src/app/core/state/auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ...globalModules,
    EffectsModule.forFeature([AuthEffect]),
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
