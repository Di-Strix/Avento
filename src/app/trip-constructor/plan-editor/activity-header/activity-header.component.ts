import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AirportNamePipe } from '../../../shared/airport/airport-name.pipe';
import { AttractionNamePipe } from '../../../shared/attraction/attraction-name.pipe';
import { StayNamePipe } from '../../../shared/stay/stay-name.pipe';
import { TripForm } from '../../trip-form';

@Component({
  selector: 'app-activity-header',
  imports: [CommonModule, MatIconModule, AirportNamePipe, StayNamePipe, AttractionNamePipe],
  templateUrl: './activity-header.component.html',
  styleUrl: './activity-header.component.scss',
})
export class ActivityHeaderComponent {
  @Input({ required: true }) control!: TripForm.Plan.Item;

  parseFromTo(control: TripForm.Plan.Item) {
    const value = control.getRawValue();

    if (value.type !== 'flight') return { from: '', to: '' };

    const from = value.connections?.at(0)?.value || '';
    const to = value.connections?.at(-1)?.value || '';

    return { from, to };
  }

  parseStayId(control: TripForm.Plan.Item): string {
    const value = control.getRawValue();
    if (value.type !== 'stay') return '';

    return value.hotel || '';
  }

  parseAttractionId(control: TripForm.Plan.Item): string {
    const value = control.getRawValue();
    if (value.type !== 'attraction') return '';

    return value.attraction || '';
  }
}
