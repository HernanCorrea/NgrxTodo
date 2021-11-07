import { User } from "../../models/User.models";

export interface AuthState {
    user: User | null,
    errorMessage: string,
}

export const initialStateAuth: AuthState = {
    user: null,
    errorMessage: '',
}