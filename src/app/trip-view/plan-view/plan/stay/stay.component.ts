import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { RatingComponent } from '../../../../shared/rating/rating.component';
import { Trip } from '../../../../shared/trip';

@Component({
  selector: 'app-stay',
  imports: [RatingComponent, MatCardModule, RouterLink, MatIcon],
  templateUrl: './stay.component.html',
  styleUrl: './stay.component.scss',
})
export class StayComponent {
  @Input({ required: true }) plan!: Trip.Plan.Stay;
}
