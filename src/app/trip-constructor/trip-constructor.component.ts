import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { finalize } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { TripRequests } from '../shared/trip/trip-requests';
import { TripService } from '../shared/trip/trip.service';

import { ConstructorFormHelpers } from './helpers/constructor-form-helpers';
import { InfoEditorComponent } from './info-editor/info-editor.component';
import { PlanEditorComponent } from './plan-editor/plan-editor.component';
import { TripForm } from './trip-form';

@Component({
  selector: 'app-trip-constructor',
  imports: [
    HeaderComponent,
    MatIconModule,
    MatCardModule,
    PlanEditorComponent,
    MatButtonModule,
    MatTooltipModule,
    InfoEditorComponent,
  ],
  templateUrl: './trip-constructor.component.html',
  styleUrl: './trip-constructor.component.scss',
})
export class TripConstructorComponent {
  tripForm: TripForm;
  uploading: boolean = false;

  constructor(
    public authService: AuthService,
    private readonly tripService: TripService,
    private readonly helpers: ConstructorFormHelpers,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.tripForm = this.helpers.createTripForm();
  }

  publish() {
    if (this.tripForm.invalid) return;

    this.tripForm.disable();
    const formData = this.tripForm.getRawValue();

    const trip = {
      info: formData.info,
      plan: formData.plan.map((item) => {
        switch (item.type) {
          case 'flight':
            return {
              type: item.type,
              connections: item.connections.map((entry) => entry.value),
            };
          case 'attraction':
            return {
              type: item.type,
              attraction: item.attraction,
              comment: item.comment,
            };
          case 'stay':
            return {
              type: item.type,
              hotel: item.hotel,
              comment: item.comment,
            };
        }
      }),
    } satisfies TripRequests.Publish.Request;

    this.tripService
      .publishTrip(trip)
      .pipe(
        finalize(() => {
          this.tripForm.enable();
          this.uploading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.snackBar.open('Published successfully!', 'Nice!', {
            panelClass: 'snack-success',
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['/trip', res.tripId]);
        },
        error: () => {
          this.snackBar.open(`Error occurred`, 'okay :(', {
            panelClass: 'snack-error',
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
  }

  getUploadButtonError() {
    if (this.tripForm.invalid) return 'Form has errors';
    if (this.uploading) 'Uploading';

    return null;
  }
}
