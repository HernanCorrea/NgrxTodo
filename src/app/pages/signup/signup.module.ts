import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { globalModules } from 'src/app/shared/modules.module';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  }
]

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ...globalModules,
    RouterModule.forChild(routes)
  ]
})
export class SignupModule { }
