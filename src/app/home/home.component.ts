import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { HeaderComponent } from '../shared/components/header/header.component';
import { TripPreviewCardComponent } from '../shared/components/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';
import { TripService } from '../shared/trip/trip.service';

@Component({
  selector: 'app-home',
  imports: [
    TripPreviewCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatFabButton,
    MatCardModule,
    MatIconModule,
    RouterLink,
    HeaderComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  trips: TripCard[] | null = null;
  compactDesign = toSignal(this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches)));

  ngOnInit(): void {
    this.tripService.loadTripsSuggestions().subscribe((cards) => {
      this.trips = cards;
    });
  }

  search(from: string, to: string) {
    this.router.navigate(['/search'], { queryParams: { from, to } });
  }
}
