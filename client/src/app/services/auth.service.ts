import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/auth/login', user).pipe(
      tap((response: LoginResponse) =>
        localStorage.setItem('chat_access_token', response.accessToken)
      ),
      tap((response: LoginResponse) =>
        alert('The login is successful')
      ),
      catchError((e) => {
        alert('Error occured while register a user');
        console.log(e);
        return throwError(() => new Error('Error occured while login a user'));
      })
    );
  }
}
