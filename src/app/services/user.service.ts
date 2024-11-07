import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerUrl = 'http://localhost:8081/api/users/register';
  private loginUrl = 'http://localhost:8081/api/users/login';

  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }
}
