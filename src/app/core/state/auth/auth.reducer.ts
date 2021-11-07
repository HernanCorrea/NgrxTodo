import { createReducer, on } from "@ngrx/store";
import { loginSuccess } from "./auth.actions";
import { initialStateAuth } from "./auth.model";

export const AuthReducer = createReducer(initialStateAuth,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),
);