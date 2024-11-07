import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-component',
  standalone: true,
  templateUrl: './test-component.component.html',
  imports: [FormsModule] // Import FormsModule here only
})
export class TestComponent {
  regUsername: string = '';
  regPassword: string = '';
  loginUsername: string = '';
  loginPassword: string = '';

  constructor(private userService: UserService) {}

  register() {
    const user = { username: this.regUsername, password: this.regPassword };
    this.userService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.regUsername = '';
        this.regPassword = '';
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }

  login() {
    const user = { username: this.loginUsername, password: this.loginPassword };
    this.userService.login(user).subscribe(
      response => {
        if (response.success) {
          console.log('Login successful:', response.message);
          // Clear the input fields
          this.loginUsername = '';
          this.loginPassword = '';
        } else {
          console.log('Login failed:', response.message);
        }
      },
      error => {
        console.error('An error occurred during login:', error);
      }
    );
  }
  
}
