import { TripCard } from '../trip/trip-cards';

export namespace UserRequests {
  export namespace GetUser {
    export interface Response {
      profile: {
        _id: string;
        name: string;
        bio: string;
        avatar: string;
      };
      trips: Array<{
        authorId: string;
        authorName: string;
        duration: number;
        id: string;
        image: string;
        liked: boolean;
        likes: number;
        name: string;
        price: number;
      }>;
    }
  }
}
