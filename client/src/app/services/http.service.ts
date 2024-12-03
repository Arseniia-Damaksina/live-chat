import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Message {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getConnection(): Observable<any> {
    console.log(this.http.get<any>('http://localhost:3000'))
    return this.http.get<any>('http://localhost:3000')
  }
}