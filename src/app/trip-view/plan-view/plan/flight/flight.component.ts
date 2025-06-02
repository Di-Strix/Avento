import { Component, Input } from '@angular/core';

import { Trip } from '../../../../shared/trip';

@Component({
  selector: 'app-flight',
  imports: [],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.scss',
})
export class FlightComponent {
  @Input({ required: true }) plan!: Trip.Plan.Flight;
}
