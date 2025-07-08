import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup,
} from '@angular/material/card';

import { TripCard } from '../trip/trip-cards';

@Component({
  selector: 'app-trip-preview-card',
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitleGroup, MatCardTitle, MatCardSubtitle],
  templateUrl: './trip-preview-card.component.html',
  styleUrl: './trip-preview-card.component.scss',
})
export class TripPreviewCardComponent {
  @Input({ required: true }) trip!: TripCard;
  @Input() appearance: 'outlined' | 'raised' = 'raised';

  @Input()
  get vertical() {
    return this._vertical;
  }
  set vertical(value: BooleanInput) {
    this._vertical = coerceBooleanProperty(value);
  }
  private _vertical: boolean = false;

  @Input() showAuthor: boolean = true;
}
