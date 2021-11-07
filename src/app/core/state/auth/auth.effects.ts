import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, finalize, map, tap } from "rxjs/operators";
import { AuthResponseData } from "../../interfaces/AuthResponseData";
import { AuthService } from "../../services/auth.service";
import { AppState } from "../app.state";
import { setErrorMessage, setLoadingSpinner } from "../shared/shared.actions";
import { loginStart, loginSuccess } from "./auth.actions";

@Injectable()
export class AuthEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                this.store.dispatch(setLoadingSpinner({status: true}));
                this.store.dispatch(setErrorMessage({message: ''}))
                return this.authService
                .login(action.email, action.password)
                .pipe(
                    map((data: AuthResponseData) => {
                        const user = this.authService.formatUser(data)
                        this.store.dispatch(setLoadingSpinner({status: false}))
                        return loginSuccess({ user })
                    }),
                    catchError(({error: {error}}) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        return of(setErrorMessage({message: this.authService.getErrorMessage(error.message)}))
                    })
                )
            })
        )
    );

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            tap(() => {
               this.router.navigate(['/post']) 
            })
        )
    }, {dispatch: false});
}