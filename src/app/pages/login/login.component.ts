import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { loginStart } from 'src/app/core/state/auth/auth.actions';
import { getErrorMessage } from 'src/app/core/state/shared/shared.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }
  
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onLogin() {
    const {email, password} = this.loginForm.value
    this.store.dispatch(loginStart({email, password}))
  }
}
