import { createAction, props } from "@ngrx/store";

export const SET_LOADING_ACTION = '[Shared] Set Loading spinner';
export const SET_ERROR_MESSAGE = '[Shared] Set Error Message';

export const setLoadingSpinner = createAction(
    SET_LOADING_ACTION,
    props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
    SET_ERROR_MESSAGE,
    props<{message: string;}>()
);