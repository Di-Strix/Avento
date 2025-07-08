import { Trip } from '../trip';

export interface TripCard {
  id: string;
  name: string;
  duration: number;
  price: number;
  author: Trip.Author;
  imageUrl: string;
}
