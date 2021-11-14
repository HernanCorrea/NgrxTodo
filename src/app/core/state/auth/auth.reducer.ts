import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logOut, signUpSuccess } from "./auth.actions";
import { initialStateAuth } from "./auth.model";

export const AuthReducer = createReducer(initialStateAuth,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(signUpSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        };
    }),
    on(logOut, (state) => {
        return {
            ...state,
            user: null
        };
    })
);