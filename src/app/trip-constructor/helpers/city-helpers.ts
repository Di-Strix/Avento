import { Injectable, inject } from '@angular/core';

import { map, of, shareReplay, zip } from 'rxjs';

import { AirportService } from '../../shared/airport/airport.service';
import { TripForm } from '../trip-form';

@Injectable({ providedIn: 'root' })
export class CityHelpers {
  private readonly airportService = inject(AirportService);

  getCityIds(plan: TripForm.Plan.Item_v[]) {
    let currentCityId$ = of<string | undefined>(undefined);

    const cityIds$ = plan.map((item) => {
      if (item.type !== 'flight') return currentCityId$;
      if (item.connections.length < 2) return currentCityId$;

      const airportId = item.connections.at(-1)?.value || undefined;
      if (airportId) {
        currentCityId$ = this.airportService.get(airportId).pipe(
          map((airport) => (airport && airport.cityId) || undefined),
          shareReplay(1)
        );
      } else currentCityId$ = of(undefined);

      return currentCityId$;
    });

    return zip(cityIds$);
  }
}
