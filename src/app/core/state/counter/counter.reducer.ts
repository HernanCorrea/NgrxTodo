import { createReducer, on } from '@ngrx/store';
import { customCounter, decrement, increment, reset, updateChannelName } from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter < 1 ? 0 : state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customCounter, (state, action) => {
    action = isNaN(action.value) ? {...action, value: 0} : action;
    return {
      ...state,
      counter: action.value ?? 0,
    };
  }),
  on(updateChannelName, (state, action) => {
    return {
      ...state,
      channelName: 'MI NUEVO CANAL'
    };
  })
);
