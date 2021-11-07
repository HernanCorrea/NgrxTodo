import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from './core/state/app.state';
import { getErrorMessage, getLoading } from './core/state/shared/shared.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  showLoading: Observable<boolean>;

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading).pipe();
  }

 
}
