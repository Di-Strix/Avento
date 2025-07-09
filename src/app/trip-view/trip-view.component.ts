import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { map, switchMap, throwError } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';
import { Trip } from '../shared/trip';
import { TripLikeButtonComponent } from '../shared/trip-like-button/trip-like-button.component';
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
    MatButtonModule,
    TripLikeButtonComponent,
  ],
  templateUrl: './trip-view.component.html',
  styleUrl: './trip-view.component.scss',
})
export class TripViewComponent {
  trip?: Trip;
  error: string = '';

  compactDesign: Signal<boolean | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly tripService: TripService,
    public readonly authService: AuthService,
    public readonly router: Router,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.compactDesign = toSignal(
      this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches))
    );

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

  login() {
    this.router.navigate(['/login'], {
      queryParams: {
        redirectTo: this.router.url,
      },
    });
  }
}
