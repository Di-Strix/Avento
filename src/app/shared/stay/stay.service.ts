import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Trip } from '../trip';

import { hotels } from './hotels';

@Injectable({
  providedIn: 'root',
})
export class StayService {
  query(searchString: string, searchCityId?: string | null): Observable<Trip.Plan.Stay.Entity[]> {
    const query = searchString.trim().toLowerCase();

    let options = Object.entries(hotels).map(([_, hotel]) => hotel);
    if (searchCityId) {
      options = options.filter(({ cityId }) => cityId === searchCityId);
    }

    if (!query) {
      return of(options.slice(0, 5));
    }

    const items = options.filter(({ displayName }) => displayName.toLowerCase().includes(query));
    return of(items);
  }

  get(id: string): Observable<Trip.Plan.Stay.Entity | null> {
    return of(id in hotels ? hotels[id] : null);
  }

  getSync(id: string): Trip.Plan.Stay.Entity | null {
    return id in hotels ? hotels[id] : null;
  }
}
