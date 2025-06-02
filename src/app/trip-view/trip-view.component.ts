import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { HeaderComponent } from '../shared/header/header.component';
import { Trip } from '../shared/trip';

import { viennaAlmatyTrip } from './mock-trip';
import { PlanViewComponent } from './plan-view/plan-view.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

@Component({
  selector: 'app-trip-view',
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatIcon,
    PostCommentComponent,
    MatToolbarModule,
    MatIconButton,
    PlanViewComponent,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss',
})
export class TripViewComponent {
  trip?: Trip;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        map((id) => {
          // Mock data for now
          return viennaAlmatyTrip;
        }),
        takeUntilDestroyed()
      )
      .subscribe((trip) => {
        this.trip = trip;
      });
  }
}
