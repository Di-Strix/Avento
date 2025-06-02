import { Component, Input } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';

import { Trip } from '../../shared/trip';

import { AttractionComponent } from './plan/attraction/attraction.component';
import { FlightComponent } from './plan/flight/flight.component';
import { StayComponent } from './plan/stay/stay.component';

@Component({
  selector: 'app-plan-view',
  imports: [MatAccordion, MatExpansionModule, MatIcon, FlightComponent, StayComponent, AttractionComponent],
  templateUrl: './plan-view.component.html',
  styleUrl: './plan-view.component.scss',
})
export class PlanViewComponent {
  @Input({ required: true }) plan!: Trip.Plan.Item[];
}
