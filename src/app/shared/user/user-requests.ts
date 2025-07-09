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

  export namespace UpdateProfile {
    export interface Request {
      name?: string;
      bio?: string;
      email?: string;
      avatar?: string;
    }

    export interface Response {
      message: string;
      user: { id: string; name: string; email: string; bio: string; avatar: string };
    }
  }

  export namespace UpdateEmail {
    export interface Request {
      newEmail: string;
      currentPassword: string;
    }

    export interface Response {
      message: string;
      user: {
        _id: string;
        name: string;
        bio: string;
        avatar: string;
        email: string;
        phone: string;
      };
    }
  }

}
