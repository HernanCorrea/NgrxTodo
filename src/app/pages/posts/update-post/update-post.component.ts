import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { updatePost } from 'src/app/core/state/post/post.actions';
import { PostI } from 'src/app/core/state/post/post.model';
import { getPostById } from 'src/app/core/state/post/post.selector';
import { filter, take, takeWhile } from 'rxjs/operators';
import { Post } from 'src/app/core/models/Post.models';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  postForm: FormGroup = new FormGroup(
    {
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    }
  );

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(async ({params}: any) => {
        const post = await this.getSelectedPost(params.id)
        this.createBuilderForm(post)
    })
  }

  createBuilderForm(post: Post): void{
    this.postForm = new FormGroup(
      {
        id: new FormControl(post.id),
        title: new FormControl(post.title, [Validators.required]),
        description: new FormControl(post.description, [Validators.required]),
      }
    );
  }

  getSelectedPost(id: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      this.store.select(getPostById(id))
      .pipe(filter(post => !!post), take(1))
      .subscribe((post: any) => {
        resolve(post);
      })
    })
    
  }

  onUpdatePost(): void {
    if (!this.postForm.valid) {
      return;
    }
    const post = this.postForm.value
    this.store.dispatch(updatePost({post}));
  }
}
