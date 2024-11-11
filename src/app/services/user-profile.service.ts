import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000/api/user-profiles'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get the user's profile (show IDs)
  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`);
  }

  // Create a new user profile
  createUserProfile(username: string, showIds: number[]): Observable<any> {
    return this.http.post(this.apiUrl, { username, showIds });
  }

  // Update the user's show IDs
  updateUserProfile(username: string, showIds: number[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/${username}`, { showIds });
  }
}
