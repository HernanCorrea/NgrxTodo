import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'post',
      //   pathMatch: 'full'
      // },
      { 
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      { 
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
      },
      { 
        path: 'post',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [RouterModule]
})
export class PagesModule { }
