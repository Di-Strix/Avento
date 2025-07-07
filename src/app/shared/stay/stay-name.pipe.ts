import { Pipe, PipeTransform } from '@angular/core';

import { Observable, map, of } from 'rxjs';

import { StayService } from './stay.service';

@Pipe({
  name: 'stayName',
})
export class StayNamePipe implements PipeTransform {
  constructor(private stayService: StayService) {}

  transform(id: string): Observable<string | null> {
    if (!id) return of(null);

    return this.stayService.get(id).pipe(map((response) => response && response.displayName));
  }
}
