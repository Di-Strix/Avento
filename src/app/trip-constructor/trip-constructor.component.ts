import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';

import { createTripForm } from './helpers';
import { PlanEditorComponent } from './plan-editor/plan-editor.component';
import { TripForm } from './trip-form';

@Component({
  selector: 'app-trip-constructor',
  imports: [
    HeaderComponent,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormField,
    PlanEditorComponent,
  ],
  templateUrl: './trip-constructor.component.html',
  styleUrl: './trip-constructor.component.scss',
})
export class TripConstructorComponent {
  tripForm: TripForm;

  constructor(
    public authService: AuthService,
    fb: NonNullableFormBuilder
  ) {
    this.tripForm = createTripForm();
  }
}
