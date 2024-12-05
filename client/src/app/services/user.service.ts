import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user', user).pipe(
      tap((registeredUser: User) =>
        alert(
          `${registeredUser.username} with ${registeredUser.email} was successfully registered`
        )
      ),
      catchError((e) => {
        alert('Error occured while register a user');
        console.log(e);
        return throwError(() => new Error('Error occured while register a user'));
      })
    );
  }
}
