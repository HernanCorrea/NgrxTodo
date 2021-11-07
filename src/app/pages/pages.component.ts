import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../core/state/auth/auth.model';
import { getErrorMessage } from '../core/state/shared/shared.selector';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  errorMessage$: Observable<string> = this.store.select(getErrorMessage)

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
  }

}
