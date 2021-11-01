import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset, customCounter, updateChannelName } from './core/state/counter/counter.actions';
import {AppStateCounter} from './core/state/app.state';
import { selectChannelName, selectCounter } from './core/state/counter/counter.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppStateCounter>) {}
  counter$ = this.store.select(selectCounter);
  channelName$ = this.store.select(selectChannelName);

  ngOnInit(): void {}

  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());

  }

  reset(): void {
    this.store.dispatch(reset());
  }

  onCustomNumber($event: any): void {
    this.store.dispatch(customCounter({value: parseInt($event.target.value)}));
  }

  updateChannelName(): void{
    this.store.dispatch(updateChannelName());
  }
}
