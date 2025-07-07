import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Trip } from '../trip';

import { airports } from './airports';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor() {}

  query(searchString: string): Observable<Trip.Plan.Flight.Entity[]> {
    const query = searchString.trim().toLowerCase();

    let options = Object.entries(airports).map(([_, airport]) => airport);
    if (!query) {
      return of(options.slice(0, 5));
    }

    const items = options.filter(({ displayName }) => displayName.toLowerCase().includes(query));
    return of(items);
  }

  get(id: string): Observable<Trip.Plan.Flight.Entity | null> {
    return of(id in airports ? airports[id] : null);
  }
}
