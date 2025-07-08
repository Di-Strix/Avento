import { Injectable, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { v4 } from 'uuid';

import { ActivityValidator } from '../activity.validator';
import { TripForm } from '../trip-form';

@Injectable({ providedIn: 'root' })
export class ConstructorFormHelpers {
  private readonly activityValidator = inject(ActivityValidator);

  createInfo(caption: string = '', duration: number = 3, price: number = 800, comment: string = ''): TripForm.Info {
    return new FormGroup({
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
  }
  createFlightConnectionItem(airportId: string = ''): TripForm.Plan.Flight.ConnectionItem {
    return new FormGroup({
      _appId: this.appId(),
      value: new FormControl(airportId, { nonNullable: true, validators: [Validators.required] }),
    });
  }

  createFlight(
    connections: TripForm.Plan.Flight.ConnectionItem[] = [
      this.createFlightConnectionItem(),
      this.createFlightConnectionItem(),
    ]
  ): TripForm.Plan.Flight {
    return new FormGroup({
      _appId: this.appId(),
      type: new FormControl<'flight'>('flight', { nonNullable: true }),
      connections: new FormArray(connections),
    });
  }
  createAttraction(attractionId: string = '', comment: string = ''): TripForm.Plan.Attraction {
    return new FormGroup({
      _appId: this.appId(),
      type: new FormControl<'attraction'>('attraction', { nonNullable: true }),
      attraction: new FormControl(attractionId, {
        nonNullable: true,
        validators: [Validators.required],
        asyncValidators: [this.activityValidator.validate.bind(this.activityValidator)],
      }),
      comment: new FormControl(comment, {
        nonNullable: true,
      }),
    });
  }

  createStay(stayId: string = '', comment: string = ''): TripForm.Plan.Stay {
    return new FormGroup({
      _appId: this.appId(),
      type: new FormControl<'stay'>('stay', { nonNullable: true }),
      hotel: new FormControl(stayId, {
        nonNullable: true,
        validators: [Validators.required],
        asyncValidators: [this.activityValidator.validate.bind(this.activityValidator)],
      }),
      comment: new FormControl(comment, { nonNullable: true }),
    });
  }

  createPlan(
    plan: TripForm.Plan.Item[] = [this.createFlight(), this.createStay(), this.createAttraction(), this.createFlight()]
  ): TripForm.Plan {
    return new FormArray(plan);
  }

  createTripForm(info: TripForm.Info = this.createInfo(), plan: TripForm.Plan = this.createPlan()): TripForm {
    return new FormGroup({ info, plan });
  }

  private appId() {
    return new FormControl(v4(), { nonNullable: true });
  }
}
