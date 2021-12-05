import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { globalModules } from 'src/app/shared/modules.module';
import { UpdatePostComponent } from './update-post/update-post.component';
import { StoreModule } from '@ngrx/store';
import { PostReducer } from 'src/app/core/state/post/post.reducer';
import { POST_STATE_NAME } from 'src/app/core/state/post/post.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from 'src/app/core/state/post/post.effects';

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
    StoreModule.forFeature(POST_STATE_NAME, PostReducer),
    EffectsModule.forFeature([PostEffects]),
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
