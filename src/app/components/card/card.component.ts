import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TvMazeService } from '../../services/tvmaze.service';
import { UserProfileService } from '../../services/user-profile.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title: string = '';
  @Input() genres: string[] = [];
  @Input() summary: string = '';
  @Input() rating?: number;
  @Input() image?: { medium: string; original: string };
  @Input() isButton: boolean = false;
  @Input() id: number = 0;
  username: string = '';

  constructor(
    private tvMazeService: TvMazeService,
    private userProfileService: UserProfileService,
    private sessionService: SessionService
  ) {}

  hovered: boolean = false;

  onMouseEnter() {
    this.hovered = true;
  }

  onMouseLeave() {
    this.hovered = false;
  }

  onCardClick() {
    if (this.id) {
      // Fetch current user's profile to get the show IDs
      this.username = this.sessionService.getUsername(); // Example username; adjust as needed
      this.userProfileService.getUserProfile(this.username).subscribe(
        (response) => {
          let showIds = response.showIds || []; // Get the current show IDs or initialize an empty array
          if (!showIds.includes(this.id)) { // Only add if ID is not already present
            showIds.push(this.id); // Add the current show's ID
            this.userProfileService.updateUserProfile(this.username, showIds).subscribe(
              () => {
                console.log(`Show ID ${this.id} added successfully`);
              },
              (error) => {
                console.error('Failed to update show IDs', error);
              }
            );
          } else {
            console.log(`Show ID ${this.id} is already in the list`);
          }
        },
        (error) => {
          // If profile fetch fails (likely because the user doesn't exist), create a new profile
          if (error.status === 404) {
            console.log("User profile not found, creating a new profile");
            this.userProfileService.createUserProfile(this.username, [this.id]).subscribe(
              () => {
                console.log(`New profile created for user ${this.username} with show ID ${this.id}`);
              },
              (createError) => {
                console.error('Failed to create new profile', createError);
              }
            );
          } else {
            console.error('Failed to fetch user profile', error);
          }
        }
      );
    } else {
      console.log("No show ID provided");
    }
  }
  
}
