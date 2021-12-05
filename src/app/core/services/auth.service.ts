import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../interfaces/AuthResponseData";
import { User } from "../models/User.models";
import { AppState } from "../state/app.state";
import { logOut } from "../state/auth/auth.actions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
    timeOutInterval: any
    constructor(private http: HttpClient, private store: Store<AppState>){}

    login(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        });
    }
    
    signUp(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`, {
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

    setUserInLocalStorage(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));

        this.runTimeOutInterval(user);
    }

    getUserInLocalStorage(): User | null {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = this.formatUser(JSON.parse(userString));
            // this.runTimeOutInterval(user);
            return user;
        }
        return null
    }

    logOut(): void {
        localStorage.removeItem('user');
        clearInterval(this.timeOutInterval);
    }

    runTimeOutInterval(user: User): void {
        const todayTime = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todayTime;

        this.timeOutInterval = setTimeout(() => {
            this.store.dispatch(logOut());
        }, timeInterval);
    }

 

    getErrorMessage(message: string): string {
        const messages: any = {
            'EMAIL_NOT_FOUND': 'Email not found',
            'INVALID_PASSWORD': 'Invalid password',
            'USER_DISABLED': 'User disabled',
            'INVALID_EMAIL': 'Invalid email address',
            'EMAIL_EXISTS': 'Email already exists',
        }
        return messages[message] || message;
    }
}