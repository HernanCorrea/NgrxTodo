import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import { deletePost } from 'src/app/core/state/post/post.actions';
import { PostI } from 'src/app/core/state/post/post.model';
import { getPostList } from 'src/app/core/state/post/post.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }
  
  postList$: Observable<PostI[]>  = this.store.select(getPostList);
  
  ngOnInit(): void {
  }

  deleteById(id: number) {
    this.store.dispatch(deletePost({id}));
  }

}
