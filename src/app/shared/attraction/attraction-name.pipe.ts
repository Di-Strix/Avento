import { Pipe, PipeTransform } from '@angular/core';

import { Observable, map, of } from 'rxjs';

import { AttractionService } from './attraction.service';

@Pipe({
  name: 'attractionName',
})
export class AttractionNamePipe implements PipeTransform {
  constructor(private attractionService: AttractionService) {}

  transform(id: string): Observable<string | null> {
    if (!id) return of(null);

    return this.attractionService.get(id).pipe(map((response) => response && response.displayName));
  }
}
