import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  imports: [MatIcon],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  entries: number[] = [];

  @Input({ required: true }) rating!: number;
  @Input({ required: true }) set maxRating(value: number) {
    this.entries = new Array(value).fill(0).map((_, i) => i + 1);
  }
}
