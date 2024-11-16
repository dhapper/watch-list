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

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  register() {
    const user = { username: this.username, password: this.password };
    this.userService.register(user).subscribe(
        response => {
            console.log(response);
            this.username = '';
            this.password = '';

            this.alertMessage = response.message;
            if(response.success)
              this.alertMessageClass = 'alert-success'; 
            else
              this.alertMessageClass = 'alert-danger'; 
        },
        error => {
            console.error('Registration failed', error);
        }
    );
  }

  login() {
    if(this.username == 'guest' && this.password == 'guest'){
      console.log("Accessing guest account, bypassing Java connection.");
      this.sessionService.setUsername(this.username);
      this.router.navigate(['/profile']);
      return;
    }
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      response => {
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
        console.error('An error occurred during login:', error);
      }
    );
  }
  
  


}
