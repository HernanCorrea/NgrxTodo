import { createAction, props } from '@ngrx/store';
/** COUNTER STATE */
export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const reset = createAction('reset');
export const customCounter = createAction('customCounter', props<{value: number}>());
export const updateChannelName = createAction('getChannelName');
