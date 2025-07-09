import { Component, Input } from '@angular/core';

import { RatingComponent } from '../../../../shared/components/rating/rating.component';
import { Trip } from '../../../../shared/trip';

@Component({
  selector: 'app-attraction',
  imports: [RatingComponent],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.scss',
})
export class AttractionComponent {
  @Input({ required: true }) plan!: Trip.Plan.Attraction;
}
