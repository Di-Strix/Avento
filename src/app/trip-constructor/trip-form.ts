import { ToForm } from '../shared/to-form';
import { Trip } from '../shared/trip';

export type TripForm = ToForm<TripForm_v>;
export type TripForm_v = {
  info: TripForm.Info_v;
  plan: TripForm.Plan_v;
};

export namespace TripForm {
  export type Info = ToForm<Info_v>;
  export type Info_v = {
    caption: string;
    duration: number;
    price: number;
    description: string;
  };

  export type Plan = ToForm<Plan_v>;
  export type Plan_v = TripForm.Plan.Item_v[];

  export namespace Plan {
    export type GenericItem = ToForm<GenericItem_v>;
    export interface GenericItem_v {
      _appId: string;
      type: Trip.Plan.Item['type'];
    }

    export type Flight = ToForm<Flight_v>;
    export type Flight_v = GenericItem_v & {
      type: 'flight';
      connections: Flight.ConnectionItem_v[];
    };

    export namespace Flight {
      export type Entity = ToForm<Entity_v>;
      export type Entity_v = string;

      export type ConnectionItem = ToForm<ConnectionItem_v>;
      export type ConnectionItem_v = {
        _appId: string;
        value: Entity_v;
      };
    }

    export type Stay = ToForm<Stay_v>;
    export type Stay_v = GenericItem_v & {
      type: 'stay';
      comment: Stay.Comment_v;
      hotel: Stay.Entity_v;
    };

    export namespace Stay {
      export type Comment = ToForm<Comment_v>;
      export type Comment_v = string;

      export type Entity = ToForm<string>;
      export type Entity_v = string;
    }

    export type Attraction = ToForm<Attraction_v>;
    export type Attraction_v = GenericItem_v & {
      type: 'attraction';
      comment: Attraction.Comment_v;
      attraction: Attraction.Entity_v;
    };

    export namespace Attraction {
      export type Comment = ToForm<string>;
      export type Comment_v = string;

      export type Entity = ToForm<string>;
      export type Entity_v = string;
    }

    export type Item = ToForm<Item_v>;
    export type Item_v = Flight_v | Stay_v | Attraction_v;
  }
}
