import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';

import { TripPreview } from '../trip-preview';

@Component({
  selector: 'app-trip-preview-card',
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitleGroup, MatCardTitle, MatCardSubtitle],
  templateUrl: './trip-preview-card.component.html',
  styleUrl: './trip-preview-card.component.scss',
})
export class TripPreviewCardComponent {
  @Input({ required: true }) trip!: TripPreview;
}
