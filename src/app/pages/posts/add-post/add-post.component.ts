import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { generateRandomNumber } from 'src/app/core/helpers/main';
import { AppState } from 'src/app/core/state/app.state';
import { addPost } from 'src/app/core/state/post/post.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }
  postForm: FormGroup
  
  ngOnInit(): void {
    this.postForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
      }
    );
  }

  onAddPost(): void {
    if (!this.postForm.valid) {
      return;
    }
    const post = this.postForm.value
    this.store.dispatch(addPost({post}));
  }

}
