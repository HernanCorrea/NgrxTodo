import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { globalModules } from 'src/app/shared/modules.module';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      { 
        path: 'add',
        component: AddPostComponent
      },
      { 
        path: 'update/:id',
        component: UpdatePostComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PostsComponent,
    AddPostComponent,
    UpdatePostComponent
  ],
  imports: [
    CommonModule,
    ...globalModules,
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
