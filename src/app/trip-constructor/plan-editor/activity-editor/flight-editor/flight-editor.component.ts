import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { createFlightConnectionItem } from '../../../helpers';
import { TripForm } from '../../../trip-form';

import { AirportSelectorComponent } from './airport-selector/airport-selector.component';

@Component({
  selector: 'app-flight-editor',
  imports: [AirportSelectorComponent, MatIconModule, MatButtonModule],
  templateUrl: './flight-editor.component.html',
  styleUrl: './flight-editor.component.scss',
})
export class FlightEditorComponent {
  @Input({ required: true }) set groupControl(group: TripForm.Plan.Item) {
    if (group.controls.type.getRawValue() !== 'flight') {
      throw new Error(
        `FlightEditorComponent expects GroupControl of type 'flight' (TripForm.Plan.Flight), got type '${group.controls.type.getRawValue()}' instead`
      );
    }

    this.control = group as TripForm.Plan.Flight;
  }

  control!: TripForm.Plan.Flight;

  insertStopover(index: number) {
    this.control.controls.connections.insert(index, createFlightConnectionItem());
  }

  deleteStopover(index: number) {
    const connections = this.control.controls.connections;
    if (index > 0 && index < connections.length) connections.removeAt(index);
  }
}
