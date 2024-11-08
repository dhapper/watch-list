import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

}
