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

import { TripLikeButtonComponent } from '../trip-like-button/trip-like-button.component';
import { TripCard } from '../trip/trip-cards';

@Component({
  selector: 'app-trip-preview-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    TripLikeButtonComponent,
  ],
  templateUrl: './trip-preview-card.component.html',
  styleUrl: './trip-preview-card.component.scss',
})
export class TripPreviewCardComponent {
  @Input({ required: true }) trip!: TripCard;
  @Input() appearance: 'outlined' | 'raised' = 'raised';
  @Input() showAuthor: boolean = true;

  @Input()
  set vertical(value: BooleanInput) {
    this._vertical = coerceBooleanProperty(value);
  }
  get vertical() {
    return this._vertical;
  }
  private _vertical: boolean = false;

  @Input() set disableLike(value: BooleanInput) {
    this._disableLike = coerceBooleanProperty(value);
  }
  get disableLike() {
    return this._disableLike;
  }
  private _disableLike: boolean = false;
}
