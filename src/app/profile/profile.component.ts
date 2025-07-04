import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/auth/user';
import { HeaderComponent } from '../shared/header/header.component';
import { TripPreview } from '../shared/trip-preview';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, MatIconModule, MatButtonModule, RouterLink, TripPreviewCardComponent, MatTooltipModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  userTrips: TripPreview[] = [];
  favoriteTrips: TripPreview[] = [];

  constructor(
    public authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => (this.user = user));
  }
}
