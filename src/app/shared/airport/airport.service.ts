import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Airport, airports } from './airports';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor() {}

  queryAirports(searchString: string): Observable<Airport[]> {
    const query = searchString.trim().toLowerCase();

    let options = Object.entries(airports).map(([_, airport]) => airport);
    if (!query) {
      return of(options.slice(0, 5));
    }

    const items = options.filter(({ displayName }) => displayName.toLowerCase().includes(query));
    return of(items);
  }

  getAirport(id: string): Observable<Airport | null> {
    return of(id in airports ? airports[id] : null);
  }
}
