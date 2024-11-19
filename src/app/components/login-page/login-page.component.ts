import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  alertMessage: string = '';
  alertMessageClass: string = '';
  loading: boolean = false; // Track if the request is loading

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  register() {
    this.loading = true; // Set loading to true when the request starts
    const user = { username: this.username, password: this.password };
    this.userService.register(user).subscribe(
      response => {
        this.loading = false; // Set loading to false when the request finishes
        this.username = '';
        this.password = '';
        this.alertMessage = response.message;
        this.alertMessageClass = response.success ? 'alert-success' : 'alert-danger'; 
      },
      error => {
        this.loading = false; // Set loading to false on error
        this.alertMessage = 'Error connecting to server';
        this.alertMessageClass = 'alert-danger';
      }
    );
  }

  login() {
    this.loading = true; // Set loading to true when the request starts
    if (this.username == 'guest' && this.password == 'guest') {
      console.log("Accessing guest account, bypassing Java connection.");
      this.sessionService.setUsername(this.username);
      this.router.navigate(['/profile']);
      this.loading = false; // Set loading to false after successful login
      return;
    }
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      response => {
        this.loading = false; // Set loading to false when the request finishes
        if (response.success) {
          console.log(response.message);
          this.alertMessage = response.message;
          this.alertMessageClass = 'alert-success';
  
          // Save the username in SessionService
          this.sessionService.setUsername(this.username);
  
          // Navigate to the profile page
          this.router.navigate(['/profile']);
        } else {
          console.log(response.message);
          this.alertMessage = response.message;
          this.alertMessageClass = 'alert-danger'; 
        }
      },
      error => {
        this.loading = false; // Set loading to false on error
        console.error('An error occurred during login:', error);
        this.alertMessage = 'Error connecting to server';
        this.alertMessageClass = 'alert-danger'; 
      }
    );
  }
}
