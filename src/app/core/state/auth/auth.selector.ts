import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.model"

export const AUTH_STATUS_NAME = 'auth'

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATUS_NAME)

export const isAuthenticated = createSelector(
    getAuthState,
    (state: AuthState) => state.user !== null)