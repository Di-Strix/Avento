import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { map, switchMap, throwError } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { Trip } from '../shared/trip';
import { TripService } from '../shared/trip/trip.service';

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
    PlanViewComponent,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss',
})
export class TripViewComponent {
  trip?: Trip;
  error: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly tripService: TripService,
    public readonly authService: AuthService,
    public readonly router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) =>
          id ? this.tripService.loadTripView(id) : throwError(() => new Error('Could not parse trip id'))
        ),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (trip) => {
          this.trip = trip;
        },
        error: (err: HttpErrorResponse | Error) => {
          if (err instanceof HttpErrorResponse) {
            this.error = err.error?.message || err.message;
          } else if (err instanceof Error) {
            this.error = err.message;
          }
        },
      });
  }

  addComment(comment: Trip.Comment) {
    if (!this.trip) return;

    this.trip.comments.push(comment);
  }
}
