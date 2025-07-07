export interface Trip {
  directions: Trip.Directions;
  info: Trip.Info;
  plan: Trip.Plan.Item[];
  comments: Trip.Comment[];
}

export namespace Trip {
  export interface Directions {
    from: Directions.Item;
    to: Directions.Item;
  }

  export namespace Directions {
    export interface Item {
      displayName: string;
      cityId: string;
    }
  }

  export interface Author {
    username: string;
    displayName: string;
  }

  export interface Info {
    author: Author;
    description: string;
  }

  export namespace Plan {
    export interface GenericItem {
      type: string;
    }

    export namespace Flight {
      export interface Entity {
        displayName: string;
        cityId: string;
        id: string;
      }
    }

    export interface Flight extends GenericItem {
      type: 'flight';
      from: string;
      to: string;
      connections: Flight.Entity[];
    }

    export namespace Stay {
      export interface Entity {
        id: string;
        cityId: string;
        displayName: string;
        website: string;
        rating: number;
        photos: string[];
      }
    }
    export interface Stay extends GenericItem {
      type: 'stay';
      comment: string;
      hotel: Stay.Entity;
      alternatives: Array<{
        comment: string;
        reviewer: Author;
        hotel: Stay.Entity;
      }>;
    }

    export namespace Attraction {
      export interface Entity {
        id: string;
        cityId: string;
        displayName: string;
        website: string;
        rating: number;
        photos: string[];
      }
    }

    export interface Attraction extends GenericItem {
      type: 'attraction';
      comment: string;
      attraction: Attraction.Entity;
    }

    export type Item = Flight | Stay | Attraction;
  }

  export interface Comment {
    author: Author;
    title: string;
    content: string;
  }
}
