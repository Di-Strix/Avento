import { Component } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../shared/header/header.component';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly tripService = inject(TripService);

  trips: TripCard[] | null = null;
}
