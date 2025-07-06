import { Pipe, PipeTransform } from '@angular/core';

import { Observable, map } from 'rxjs';

import { AirportService } from './airport.service';

@Pipe({
  name: 'airportName',
})
export class AirportNamePipe implements PipeTransform {
  constructor(private airportService: AirportService) {}

  transform(id: string): Observable<string | null> {
    return this.airportService.getAirport(id).pipe(map((response) => response && response.displayName));
  }
}
