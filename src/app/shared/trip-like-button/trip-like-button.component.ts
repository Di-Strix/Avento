import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { Subject, switchMap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { TripService } from '../trip/trip.service';

@Component({
  selector: 'app-trip-like-button',
  imports: [MatIconButton, MatIcon, MatTooltip],
  templateUrl: './trip-like-button.component.html',
  styleUrl: './trip-like-button.component.scss',
})
export class TripLikeButtonComponent implements OnInit {
  private readonly tripService = inject(TripService);
  public readonly authService = inject(AuthService);

  clicks$ = new Subject<void>();
  disabled = computed(() => !this.authService.currentUser());

  @Input() liked: boolean = false;
  @Input({ required: true }) tripId!: string;

  ngOnInit(): void {
    this.clicks$.pipe(switchMap(() => this.tripService.likeTrip(this.tripId, this.liked))).subscribe({
      next: ({ liked }) => {
        this.liked = liked;
      },
      error: (err) => console.error(err),
    });
  }

  like(event: Event) {
    event.stopImmediatePropagation();
    if (this.disabled()) return;

    this.liked = !this.liked;
    this.clicks$.next();
  }
}
