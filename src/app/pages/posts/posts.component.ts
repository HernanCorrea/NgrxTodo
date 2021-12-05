import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/Post.models';
import { AppState } from 'src/app/core/state/app.state';
import { deletePost, loadPosts } from 'src/app/core/state/post/post.actions';
import { getPostList } from 'src/app/core/state/post/post.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  
  postList$: Observable<Post[] | null>  = this.store.select(getPostList);
  
  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  deleteById(id: string) {
    this.store.dispatch(deletePost({id}));
  }

}
