import { Trip } from '../trip';

export const attractions: Record<string, Trip.Plan.Attraction.Entity> = {
  '001': {
    id: '001',
    cityId: '1',
    displayName: 'Kok-Tobe Hill',
    website: 'https://example.com/',
    rating: 4,
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/92/21/8b/img-20190223-110621-largejpg.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/52/15/f5/caption.jpg',
    ],
  },
};
