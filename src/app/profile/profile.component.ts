import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/auth/user';
import { HeaderComponent } from '../shared/header/header.component';
import { IdentityPanelComponent } from '../shared/identity-panel/identity-panel.component';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';
import { TripService } from '../shared/trip/trip.service';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TripPreviewCardComponent,
    MatTooltipModule,
    IdentityPanelComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);

  user: User | null = null;

  userTrips: TripCard[] | null = null;
  favoriteTrips: TripCard[] | null = null;

  compactDesign = toSignal(this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches)));

  constructor(
    public authService: AuthService,
    private readonly tripService: TripService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => (this.user = user));
    this.tripService.loadUserTrips().subscribe((trips) => (this.userTrips = trips));
    this.tripService.loadFavoriteTrips().subscribe((trips) => (this.favoriteTrips = trips));
  }
}
