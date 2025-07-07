import { Component, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TripForm } from '../trip-form';

@Component({
  selector: 'app-info-editor',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './info-editor.component.html',
  styleUrl: './info-editor.component.scss',
})
export class InfoEditorComponent {
  @Input({ required: true }) form!: TripForm.Info;
}
