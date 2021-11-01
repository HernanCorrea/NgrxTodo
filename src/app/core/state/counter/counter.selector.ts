import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateCounter } from '../app.state';
import { CounterI } from './counter.model';

export const selectCounterState = createFeatureSelector<
  AppStateCounter,
  Readonly<CounterI>
>('count');

export const selectChannelName = createSelector(
    selectCounterState,
    (counter: CounterI) => counter.channelName
);

export const selectCounter = createSelector(
    selectCounterState,
    (counter: CounterI) => counter.counter
);
