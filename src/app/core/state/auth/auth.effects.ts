import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { merge, of } from "rxjs";
import { catchError, exhaustMap, finalize, map, mergeMap, tap } from "rxjs/operators";
import { AuthResponseData } from "../../interfaces/AuthResponseData";
import { AuthService } from "../../services/auth.service";
import { AppState } from "../app.state";
import { setErrorMessage, setLoadingSpinner } from "../shared/shared.actions";
import { autoLogin, loginStart, loginSuccess, logOut, signUpStart, signUpSuccess } from "./auth.actions";

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
                return this.authService
                .login(action.email, action.password)
                .pipe(
                    map((data: AuthResponseData) => {
                        const user = this.authService.formatUser(data)
                        this.store.dispatch(setLoadingSpinner({status: false}))
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user, redirect: true })
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
            ofType(loginSuccess, signUpSuccess),
            tap((action) => {
                this.store.dispatch(setErrorMessage({message: ''}))
                if (action.redirect) {
                    this.router.navigate(['/post']) 
                }
            })
        )
    }, {dispatch: false});

    logOutRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logOut),
            tap(() => {
               this.authService.logOut();
               this.router.navigate(['/login']) 
            })
        )
    }, {dispatch: false});
    
    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signUpStart),
            exhaustMap((action) => {
                this.store.dispatch(setLoadingSpinner({status: true}));
                return this.authService.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({status: false}))
                        const user = this.authService.formatUser(data)
                        this.authService.setUserInLocalStorage(user);
                        return signUpSuccess({ user, redirect: true })
                    }),
                    catchError(({error: {error}}) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        return of(setErrorMessage(
                            {
                                message: this.authService.getErrorMessage(error.message)
                            }
                        ))
                    })
                )
            })
        )
    )

    autoLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserInLocalStorage()
                return of(loginSuccess({ user, redirect: false }))
            })

        )
    )
}