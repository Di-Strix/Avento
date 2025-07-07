import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';

import { createTripForm } from './helpers';
import { InfoEditorComponent } from './info-editor/info-editor.component';
import { PlanEditorComponent } from './plan-editor/plan-editor.component';
import { TripForm } from './trip-form';

@Component({
  selector: 'app-trip-constructor',
  imports: [HeaderComponent, MatIconModule, MatCardModule, PlanEditorComponent, InfoEditorComponent],
  templateUrl: './trip-constructor.component.html',
  styleUrl: './trip-constructor.component.scss',
})
export class TripConstructorComponent {
  tripForm: TripForm;

  constructor(public authService: AuthService) {
    this.tripForm = createTripForm();
  }
}
