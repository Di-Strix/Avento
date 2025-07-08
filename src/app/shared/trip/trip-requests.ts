export namespace TripRequests {
  export namespace Publish {
    export interface Request {
      info: {
        caption: string;
        description: string;
        duration: number;
        price: number;
      };
      plan: Array<
        | { type: 'flight'; connections: Array<string> }
        | { type: 'attraction'; comment: string; attraction: string }
        | { type: 'stay'; comment: string; hotel: string }
      >;
    }

    export interface Response {
      tripId: string;
      message: string;
    }
  }

  export namespace FetchView {
    type Author = {
      id: string;
      name: string;
    };
    type Hotel = {
      id: string;
      cityId: string;
      displayName: string;
      website: string;
      rating: number;
      photos: string[];
    };

    export interface Response {
      id: string;
      directions: { from: string; to: string };
      info: {
        author: Author;
        caption: string;
        description: string;
        duration: number;
        price: number;
      };
      plan: Array<
        | {
            type: 'flight';
            connections: Array<{ displayName: string; cityId: string; id: string }>;
          }
        | {
            type: 'stay';
            comment: string;
            hotel: Hotel;
            alternatives: Array<{
              comment: string;
              reviewer: Author;
              hotel: Hotel;
            }>;
          }
        | {
            type: 'attraction';
            comment: string;
            attraction: {
              id: string;
              cityId: string;
              displayName: string;
              website: string;
              rating: number;
              photos: string[];
            };
          }
      >;
      comments: Array<{
        _id: string;
        tripId: string;
        authorId: string;
        title: string;
        content: string;
        createdAt: string;
        author: {
          id: string;
          name: string;
        };
      }>;
    }
  }

  export namespace FetchCards {
    export type Response = Array<{
      id: string;
      name: string;
      duration: number;
      price: number;
      authorId: string;
      authorName: string;
      image: string;
    }>;
  }

  export namespace PostComment {
    export interface Request {
      title: string;
      content: string;
    }

    export interface Response {
      message: string;
      comment: {
        tripId: string;
        authorId: string;
        title: string;
        content: string;
        createdAt: string;
      };
    }
  }
}
