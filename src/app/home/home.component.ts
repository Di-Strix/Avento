import { Component } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../shared/header/header.component';
import { TripPreview } from '../shared/trip-preview';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';

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
  trips: TripPreview[] = [
    {
      id: '1',
      author: 'minkx',
      country: 'Kazakhstan',
      duration: '2',
      hotelPrice: 100,
      totalPrice: 150,
      ticketPrice: 50,
      imageUrl: 'countries/Kazakhstan.jpg',
    },
    {
      id: '2',
      author: 'estonista',
      country: 'Estonia',
      duration: '2',
      hotelPrice: 100,
      totalPrice: 175,
      ticketPrice: 50,
      imageUrl: 'countries/Estonia.jpg',
    },
    {
      id: '3',
      author: 'John',
      country: 'Brazil',
      duration: '2',
      hotelPrice: 100,
      totalPrice: 300,
      ticketPrice: 50,
      imageUrl: 'countries/Brazil.jpg',
    },
  ];
}
