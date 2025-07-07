import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TripForm } from '../../../trip-form';

import { StaySelectorComponent } from './stay-selector/stay-selector.component';

@Component({
  selector: 'app-stay-editor',
  imports: [StaySelectorComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './stay-editor.component.html',
  styleUrl: './stay-editor.component.scss',
})
export class StayEditorComponent {
  @Input({ required: true }) set groupControl(group: TripForm.Plan.Item) {
    if (group.controls.type.getRawValue() !== 'stay') {
      throw new Error(
        `FlightEditorComponent expects GroupControl of type 'flight' (TripForm.Plan.Flight), got type '${group.controls.type.getRawValue()}' instead`
      );
    }

    this.formGroup = group as TripForm.Plan.Stay;
  }
  @Input() cityId?: string | null;

  formGroup!: TripForm.Plan.Stay;
}
