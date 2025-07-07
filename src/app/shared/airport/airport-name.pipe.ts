import { Pipe, PipeTransform } from '@angular/core';

import { Observable, map, of } from 'rxjs';

import { AirportService } from './airport.service';

@Pipe({
  name: 'airportName',
})
export class AirportNamePipe implements PipeTransform {
  constructor(private airportService: AirportService) {}

  transform(id: string): Observable<string | null> {
    if (!id) return of(null);

    return this.airportService.get(id).pipe(map((response) => response && response.displayName));
  }
}
