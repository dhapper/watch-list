import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and *ngFor
import { TvMazeService } from '../../services/tvmaze.service';
import { Show } from '../../models/show';
import { CardComponent } from "../card/card.component";
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, CommonModule, CardComponent], // Add CommonModule here
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  searchQuery: string = '';
  searchResults: Show[] = [];
  username: string = '';

  constructor(
    private tvMazeService: TvMazeService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.username = this.sessionService.getUsername();
  }

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

  shortSummary(summary: string): string {
    if (summary.length > 200) {
      return summary.slice(0, 197) + '...';
    }
    return summary;
  }
  
  // card.component.ts or your parent component file
stripHtmlTags(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

}
