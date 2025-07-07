import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TripForm } from '../../../trip-form';

import { AttractionSelectorComponent } from './attraction-selector/attraction-selector.component';

@Component({
  selector: 'app-attraction-editor',
  imports: [AttractionSelectorComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './attraction-editor.component.html',
  styleUrl: './attraction-editor.component.scss',
})
export class AttractionEditorComponent {
  @Input({ required: true }) set groupControl(group: TripForm.Plan.Item) {
    if (group.controls.type.getRawValue() !== 'attraction') {
      throw new Error(
        `FlightEditorComponent expects GroupControl of type 'flight' (TripForm.Plan.Flight), got type '${group.controls.type.getRawValue()}' instead`
      );
    }

    this.formGroup = group as TripForm.Plan.Attraction;
  }
  @Input() cityId?: string | null;

  formGroup!: TripForm.Plan.Attraction;
}
