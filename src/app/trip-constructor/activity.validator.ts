import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { Observable, map, of } from 'rxjs';

import { AttractionService } from '../shared/attraction/attraction.service';
import { StayService } from '../shared/stay/stay.service';

import { getCityIds } from './helpers';
import { TripForm } from './trip-form';

type GenericItem = TripForm.Plan.GenericItem_v;

@Injectable({ providedIn: 'root' })
export class ActivityValidator implements AsyncValidator {
  private readonly attractionService = inject(AttractionService);
  private readonly stayService = inject(StayService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!(control instanceof FormControl)) return of(null);
    if (!(control.parent instanceof FormGroup)) return of(null);
    const group = control.parent;

    if (!(group.parent instanceof FormArray)) return of(null);
    const planForm = group.parent;

    const info = extractGenericInfo(group.getRawValue());
    if (!info) return of(null);

    const plan = planForm.getRawValue().filter((item) => isGenericItem(item)) as TripForm.Plan.Item_v[];
    const cityIds = getCityIds(plan);

    const formId = info.appId;
    const formIndex = planForm.getRawValue().findIndex((item) => extractGenericInfo(item)?.appId === formId);
    if (!formIndex) return of(null);

    const itemCityId = cityIds[formIndex];
    let stream: Observable<string | null> = of(null);

    switch (info.type) {
      case 'attraction':
        const attractionId = control.getRawValue() as TripForm.Plan.Attraction.Entity_v;
        stream = this.attractionService.get(attractionId).pipe(map((attraction) => attraction?.cityId || null));
        break;
      case 'stay':
        const stayId = control.getRawValue() as TripForm.Plan.Stay.Entity_v;
        stream = this.stayService.get(stayId).pipe(map((stay) => stay?.cityId || null));
        break;
    }

    return stream.pipe(
      map((cityId) => {
        if (cityId && cityId !== itemCityId) return { location: true };

        return null;
      })
    );
  }
}

function extractGenericInfo(value: any) {
  if (!isGenericItem(value)) return;

  const item = value as GenericItem;

  return { appId: item._appId, type: item.type };
}

function isGenericItem(value: any) {
  const appIdKey = '_appId' satisfies keyof GenericItem;
  const typeKey = 'type' satisfies keyof GenericItem;

  if (!(appIdKey in value) || typeof value[appIdKey] !== 'string') return false;
  if (!(typeKey in value) || typeof value[appIdKey] !== 'string') return false;

  return true;
}
