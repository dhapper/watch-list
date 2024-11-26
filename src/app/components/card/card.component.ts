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

  alertMessage: string = ''; // Property for the alert message
  username: string = '';
  hovered: boolean = false; // Property to track hover state

  constructor(
    private tvMazeService: TvMazeService,
    private userProfileService: UserProfileService,
    private sessionService: SessionService
  ) {}

  onMouseEnter() {
    this.hovered = true; // Set hovered state to true
  }

  onMouseLeave() {
    this.hovered = false; // Set hovered state to false
  }

  onCardClick() {
    if (this.id) {
      this.username = this.sessionService.getUsername();
      this.userProfileService.getUserProfile(this.username).subscribe(
        (response) => {
          let showIds = response.showIds || [];
          if (!showIds.includes(this.id)) {
            showIds.push(this.id);
            this.userProfileService.updateUserProfile(this.username, showIds).subscribe(
              () => {
                this.alertMessage = `${this.title} has been added to your watch-list`; // Set alert message
                setTimeout(() => (this.alertMessage = ''), 3000); // Clear the message after 3 seconds
              },
              (error) => {
                console.error('Failed to update show IDs', error);
              }
            );
          } else {
            this.alertMessage = `${this.title} is already in your watch-list`; // Show already exists message
            setTimeout(() => (this.alertMessage = ''), 3000); // Clear the message after 3 seconds
          }
        },
        (error) => {
          if (error.status === 404) {
            this.userProfileService.createUserProfile(this.username, [this.id]).subscribe(
              () => {
                this.alertMessage = `${this.title} has been added to your watch-list`; // New profile message
                setTimeout(() => (this.alertMessage = ''), 3000); // Clear the message after 3 seconds
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
