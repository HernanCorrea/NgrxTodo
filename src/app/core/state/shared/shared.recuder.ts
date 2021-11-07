import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "./shared.actions";
import { initialState, SharedState } from "./shared.state";

export function SharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}

const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action): SharedState => {
        return {
            ...state,
            showLoading: action.status,
        };
    }),
    on(setErrorMessage, (state, action): SharedState => {
        return {
            ...state,
            errorMessage: action.message,
        };
    }),
)