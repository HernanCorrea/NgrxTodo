import { createAction, props } from "@ngrx/store"
import { User } from "../../models/User.models"

export const LOGIN_START = '[Auth] Login Start'
export const LOGIN_SUCCESS = '[Auth] Login Success'
export const LOGIN_FAIL = '[Auth] Login Fail'

export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string, password: string }>()
)

export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ user: User}>())

export const loginFail = createAction(
    LOGIN_FAIL,
    props<{ error: string }>()
)