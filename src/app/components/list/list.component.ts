import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service'; // Import the service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  username: string = 'test'; // Assign a dummy username
  showIds: number[] = []; // Array to hold the show IDs

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.getUserProfile(); // Fetch the show IDs for the dummy user when the component initializes
  }

  // Fetch the user profile based on the dummy username
  getUserProfile(): void {
    this.userProfileService.getUserProfile(this.username).subscribe(
      (response) => {
        console.log('User profile fetched:', response);
        this.showIds = response.showIds; // Assign the showIds from the response
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}