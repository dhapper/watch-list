import { Component, Input, OnInit } from '@angular/core';
import { TvMazeService } from '../../services/tvmaze.service';
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { Show } from '../../models/show';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() username!: string; // Dummy username
  showIds: number[] = []; // Array to hold the show IDs
  shows: Show[] = []; // Array to hold the show objects

  // Inject both TvMazeService and UserProfileService
  constructor(
    private tvMazeService: TvMazeService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.getUserProfile(); // Fetch the show IDs on component initialization
  }

  // Fetch user profile data with show IDs
  getUserProfile(): void {
    this.userProfileService.getUserProfile(this.username).subscribe(
      (response) => {
        console.log('User profile fetched:', response);
        this.showIds = response.showIds;
        this.fetchShowDetails(); // Fetch show details one by one
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  // Fetch each show detail one by one
  fetchShowDetails(): void {
    this.shows = []; // Clear the existing shows array
    this.showIds.forEach((showId) => {
      this.tvMazeService.getShowById(showId).subscribe(
        (show: Show) => {
          this.shows.push(show); // Add each fetched show to the array
        },
        (error) => {
          console.error(`Error fetching show with ID ${showId}:`, error);
        }
      );
    });
  }

  removeShow(showId: number): void {
    // Create a new array with the specified showId removed
    const updatedShowIds = this.showIds.filter(id => id !== showId);
  
    // Call the service to update the user profile with the updated showIds array
    this.userProfileService.updateUserProfile(this.username, updatedShowIds).subscribe(
      () => {
        console.log(`Show ID ${showId} removed successfully`);
        // Update the local showIds and shows arrays after successful update
        this.showIds = updatedShowIds;
        this.shows = this.shows.filter(show => show.id !== showId);
      },
      (error) => {
        console.error('Failed to update show IDs after deletion', error);
      }
    );
  }
  
}
