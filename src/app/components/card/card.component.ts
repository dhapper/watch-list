import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TvMazeService } from '../../services/tvmaze.service';

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

  constructor(private tvMazeService: TvMazeService) {}

  hovered: boolean = false;

  onMouseEnter() {
    this.hovered = true;
  }
  
  onMouseLeave() {
    this.hovered = false;
  }
  

  onCardClick() {
    if (this.id) {
      this.tvMazeService.getShowById(this.id).subscribe(
        (show) => {
          console.log("Fetched Show Data: ", show.id);
        },
        (error) => {
          console.error("Failed to fetch show data", error);
        }
      );
    } else {
      console.log("No show ID provided");
    }
  }
}
