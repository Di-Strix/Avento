import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/auth/user';
import { HeaderComponent } from '../shared/header/header.component';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';
import { TripService } from '../shared/trip/trip.service';
import { PublicUser } from '../shared/user/public-user';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-public-profile',
  imports: [HeaderComponent, MatIconModule, MatButtonModule, RouterLink, TripPreviewCardComponent, MatTooltipModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss',
})
export class PublicProfileComponent implements OnDestroy {
  private readonly userService = inject(UserService);

  @Input({ required: true }) set userId(id) {
    if (this.userId === id) return;
    this._userId = id;

    this.reload();
  }
  get userId() {
    return this._userId;
  }
  _userId!: string;

  error: string = '';
  user: PublicUser | null = null;
  userTrips: TripCard[] | null = null;

  reset$ = new Subject<void>();

  ngOnDestroy(): void {
    this.reset$.next();
  }

  reload() {
    this.reset$.next();

    this.user = null;
    this.userTrips = null;
    this.error = '';

    this.userService
      .getUser(this.userId)
      .pipe(takeUntil(this.reset$))
      .subscribe({
        next: (data) => {
          this.userTrips = data.trips;
          this.user = data.profile;
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error?.message || err.message;
          console.error(err);
        },
      });
  }
}
