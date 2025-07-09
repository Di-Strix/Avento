import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { Subject, map, takeUntil } from 'rxjs';

import { HeaderComponent } from '../shared/components/header/header.component';
import { IdentityPanelComponent } from '../shared/components/identity-panel/identity-panel.component';
import { TripPreviewCardComponent } from '../shared/components/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';
import { PublicUser } from '../shared/user/public-user';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-public-profile',
  imports: [
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TripPreviewCardComponent,
    MatTooltipModule,
    IdentityPanelComponent,
  ],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss',
})
export class PublicProfileComponent implements OnDestroy {
  private readonly userService = inject(UserService);
  private readonly breakpointObserver = inject(BreakpointObserver);

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
  compactDesign = toSignal(this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches)));

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
