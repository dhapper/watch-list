import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and *ngFor
import { TvMazeService } from '../../../services/tvmaze.service';
import { Show } from '../../../models/show';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  searchQuery: string = '';
  searchResults: Show[] = [];

  constructor(private tvMazeService: TvMazeService) {}

  search() {
    if (this.searchQuery) {
      this.tvMazeService.searchShows(this.searchQuery).subscribe(
        (response) => {
          this.searchResults = response;
        },
        (error) => {
          console.error('Search failed', error);
        }
      );
    } else {
      console.log('Please enter a search term');
    }
  }
}
