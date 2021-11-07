import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared'

// export const selectPostState = createFeatureSelector<
//   AppState,
//   Readonly<PostState>
// >('posts');

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(
    selectSharedState,
    (shared: SharedState) => shared.showLoading
);

export const getErrorMessage = createSelector(
    selectSharedState,
    (shared: SharedState) => shared.errorMessage
);