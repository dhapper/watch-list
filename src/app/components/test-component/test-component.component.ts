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
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  register() {
    const user = { username: this.username, password: this.password };
    this.userService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.username = '';
        this.password = '';
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
