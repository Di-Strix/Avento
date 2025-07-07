import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Trip } from '../trip';

import { attractions } from './attractions';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  query(searchString: string, searchCityId?: string | null): Observable<Trip.Plan.Attraction.Entity[]> {
    const query = searchString.trim().toLowerCase();

    let options = Object.entries(attractions).map(([_, hotel]) => hotel);
    if (searchCityId) {
      options = options.filter(({ cityId }) => cityId === searchCityId);
    }

    if (!query) {
      return of(options.slice(0, 5));
    }

    const items = options.filter(({ displayName }) => displayName.toLowerCase().includes(query));
    return of(items);
  }

  get(id: string): Observable<Trip.Plan.Attraction.Entity | null> {
    return of(id in attractions ? attractions[id] : null);
  }

  getSync(id: string): Trip.Plan.Attraction.Entity | null {
    return id in attractions ? attractions[id] : null;
  }
}
