import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../interfaces/AuthResponseData";
import { User } from "../models/User.models";

@Injectable({
  providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient){}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        });
    }

    formatUser(data: AuthResponseData){
        return new User(
            data.email,
            data.idToken,
            data.localId,
            new Date(new Date().getTime() + +data.expiresIn * 1000),
            data.registered
        );
    }

    getErrorMessage(message: string): string {
        const messages: any = {
            'EMAIL_NOT_FOUND': 'Email not found',
            'INVALID_PASSWORD': 'Invalid password',
            'USER_DISABLED': 'User disabled',
            'INVALID_EMAIL': 'Invalid email address',
        }
        return messages[message] || message;
    }
}