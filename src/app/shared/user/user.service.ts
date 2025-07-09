import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TripCard } from '../trip/trip-cards';

import { PublicUser } from './public-user';
import { UserRequests } from './user-requests';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getUser(userId: string): Observable<{ profile: PublicUser; trips: TripCard[] }> {
    return this.httpClient.get<UserRequests.GetUser.Response>(environment.api.endpoint + '/users/' + userId).pipe(
      map((response) => ({
        profile: {
          id: response.profile._id,
          name: response.profile.name,
          bio: response.profile.bio,
          avatar: response.profile.avatar,
        },
        trips: response.trips.map(
          (trip) =>
            ({
              id: trip.id,
              name: trip.name,
              duration: trip.duration,
              author: {
                id: trip.authorId,
                name: trip.authorName,
              },
              imageUrl: trip.image,
              price: trip.price,
              liked: trip.liked,
            }) satisfies TripCard
        ),
      }))
    );
  }
}
