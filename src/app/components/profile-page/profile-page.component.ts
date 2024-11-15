import { Component } from '@angular/core';
import { ListComponent } from "../list/list.component";
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  username: string = ''; // Initialize with an empty string

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.username = this.sessionService.getUsername();
    console.log('Username retrieved in Profile Page:', this.username); // Log to debug
  }
}
