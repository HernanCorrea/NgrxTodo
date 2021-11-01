import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state/app.state';
import { updatePost } from 'src/app/core/state/post/post.actions';
import { PostI } from 'src/app/core/state/post/post.model';
import { getPostById } from 'src/app/core/state/post/post.selector';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }
  postForm: FormGroup
  
  ngOnInit(): void {
    this.createBuilderForm()
    this.route.paramMap.subscribe(async ({params}: any) => {
        const post = await this.getSelectedPost(parseInt(params.id))
        this.createBuilderForm(post)
    })
  }

  createBuilderForm(post: PostI = {id: 1, title: '', content: ''}): void{
    this.postForm = new FormGroup(
      {
        id: new FormControl(post?.id),
        title: new FormControl(post?.title, [Validators.required]),
        content: new FormControl(post?.content, [Validators.required]),
      }
    );
  }

  getSelectedPost(id: number): Promise<PostI | undefined> {
    return new Promise((resolve, reject) => {
      this.store.select(getPostById(id))
      .pipe(take(1))
      .subscribe((post: PostI | undefined) => {
        resolve(post );
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
