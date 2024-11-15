import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionKey: string = 'username'; // Store the key used for username

  // Save username to localStorage (or sessionStorage)
  setUsername(username: string): void {
    localStorage.setItem(this.sessionKey, username); // Store username in localStorage
  }

  // Retrieve the username from localStorage
  getUsername(): string {
    return localStorage.getItem(this.sessionKey) || ''; // Default to empty string if not found
  }

  // Clear username when needed
  clearUsername(): void {
    localStorage.removeItem(this.sessionKey); // Clear username from localStorage
  }
}
