import { Component, Input } from '@angular/core';

import { TripForm } from '../../trip-form';

import { AttractionEditorComponent } from './attraction-editor/attraction-editor.component';
import { FlightEditorComponent } from './flight-editor/flight-editor.component';
import { StayEditorComponent } from './stay-editor/stay-editor.component';

@Component({
  selector: 'app-activity-editor',
  imports: [FlightEditorComponent, StayEditorComponent, AttractionEditorComponent],
  templateUrl: './activity-editor.component.html',
  styleUrl: './activity-editor.component.scss',
})
export class ActivityEditorComponent {
  @Input() cityId?: string | null;
  @Input({ required: true }) control!: TripForm.Plan.Item;
}
