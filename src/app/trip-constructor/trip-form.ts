import { FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';

import { Trip } from '../shared/trip';

export type TripForm = FormGroup<{
  info: TripForm.Info;
  plan: TripForm.Plan;
}>;

export namespace TripForm {
  export type Info = FormGroup<{
    description: FormControl<string>;
  }>;

  export type Plan = FormArray<TripForm.Plan.Item>;

  export namespace Plan {
    export interface GenericItem {
      _appId: FormControl<string>;
      type: FormControl<Trip.Plan.Item['type']>;
    }

    export type Flight = FormGroup<
      GenericItem & {
        type: FormControl<'flight'>;
        connections: FormArray<Flight.ConnectionItem>;
      }
    >;

    export namespace Flight {
      export type Entity = FormControl<string>;

      export type ConnectionItem = FormGroup<{
        _appId: FormControl<string>;
        value: Entity;
      }>;
    }

    export type Stay = FormGroup<
      GenericItem & {
        type: FormControl<'stay'>;
        comment: Stay.Comment;
        hotel: Stay.Entity;
      }
    >;

    export namespace Stay {
      export type Comment = FormControl<string>;
      export type Entity = FormControl<string>;
    }

    export type Attraction = FormGroup<
      GenericItem & {
        type: FormControl<'attraction'>;
        comment: Attraction.Comment;
        attraction: Attraction.Entity;
      }
    >;

    export namespace Attraction {
      export type Comment = FormControl<string>;
      export type Entity = FormControl<string>;
    }

    export type Item = Flight | Stay | Attraction;
  }
}
