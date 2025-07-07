import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { v4 } from 'uuid';

import { TripForm } from './trip-form';

const appId = () => new FormControl(v4(), { nonNullable: true });

export const createInfo = (comment: string = ''): TripForm.Info =>
  new FormGroup({
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

export const createAttraction = (attractionId: string = '', comment: string = ''): TripForm.Plan.Attraction =>
  new FormGroup({
    _appId: appId(),
    type: new FormControl<'attraction'>('attraction', { nonNullable: true }),
    attraction: new FormControl(attractionId, { nonNullable: true, validators: [Validators.required] }),
    comment: new FormControl(comment, { nonNullable: true }),
  });

export const createStay = (stayId: string = '', comment: string = ''): TripForm.Plan.Stay =>
  new FormGroup({
    _appId: appId(),
    type: new FormControl<'stay'>('stay', { nonNullable: true }),
    hotel: new FormControl(stayId, { nonNullable: true, validators: [Validators.required] }),
    comment: new FormControl(comment, { nonNullable: true }),
  });

export const createPlan = (
  plan: TripForm.Plan.Item[] = [createFlight(), createStay(), createAttraction(), createFlight()]
): TripForm.Plan => new FormArray(plan);

export const createTripForm = (info: TripForm.Info = createInfo(), plan: TripForm.Plan = createPlan()): TripForm =>
  new FormGroup({ info, plan });
