import { inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { map, of, shareReplay, zip } from 'rxjs';
import { v4 } from 'uuid';

import { AirportService } from '../shared/airport/airport.service';

import { ActivityValidator } from './activity.validator';
import { TripForm } from './trip-form';

const appId = () => new FormControl(v4(), { nonNullable: true });

export const createInfo = (
  caption: string = '',
  duration: number = 3,
  price: number = 800,
  comment: string = ''
): TripForm.Info =>
  new FormGroup({
    caption: new FormControl(caption, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
    }),
    duration: new FormControl(duration, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(90)],
    }),
    price: new FormControl(price, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    description: new FormControl(comment, { nonNullable: true }),
  });

export const createFlightConnectionItem = (airportId: string = ''): TripForm.Plan.Flight.ConnectionItem =>
  new FormGroup({
    _appId: appId(),
    value: new FormControl(airportId, { nonNullable: true, validators: [Validators.required] }),
  });

export const createFlight = (
  connections: TripForm.Plan.Flight.ConnectionItem[] = [createFlightConnectionItem(), createFlightConnectionItem()]
): TripForm.Plan.Flight =>
  new FormGroup({
    _appId: appId(),
    type: new FormControl<'flight'>('flight', { nonNullable: true }),
    connections: new FormArray(connections),
  });

export const createAttraction = (attractionId: string = '', comment: string = ''): TripForm.Plan.Attraction => {
  const activityValidator = inject(ActivityValidator);

  return new FormGroup({
    _appId: appId(),
    type: new FormControl<'attraction'>('attraction', { nonNullable: true }),
    attraction: new FormControl(attractionId, {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [activityValidator.validate.bind(activityValidator)],
    }),
    comment: new FormControl(comment, {
      nonNullable: true,
    }),
  });
};

export const createStay = (stayId: string = '', comment: string = ''): TripForm.Plan.Stay => {
  const activityValidator = inject(ActivityValidator);

  return new FormGroup({
    _appId: appId(),
    type: new FormControl<'stay'>('stay', { nonNullable: true }),
    hotel: new FormControl(stayId, {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [activityValidator.validate.bind(activityValidator)],
    }),
    comment: new FormControl(comment, { nonNullable: true }),
  });
};

export const createPlan = (
  plan: TripForm.Plan.Item[] = [createFlight(), createStay(), createAttraction(), createFlight()]
): TripForm.Plan => new FormArray(plan);

export const createTripForm = (info: TripForm.Info = createInfo(), plan: TripForm.Plan = createPlan()): TripForm =>
  new FormGroup({ info, plan });

export const getCityIds = (plan: TripForm.Plan.Item_v[], airportService: AirportService) => {
  let currentCityId$ = of<string | undefined>(undefined);

  const cityIds$ = plan.map((item) => {
    if (item.type !== 'flight') return currentCityId$;
    if (item.connections.length < 2) return currentCityId$;

    const airportId = item.connections.at(-1)?.value || undefined;
    if (airportId) {
      currentCityId$ = airportService.get(airportId).pipe(
        map((airport) => (airport && airport.cityId) || undefined),
        shareReplay(1)
      );
    } else currentCityId$ = of(undefined);

    return currentCityId$;
  });

  return zip(cityIds$);
};
