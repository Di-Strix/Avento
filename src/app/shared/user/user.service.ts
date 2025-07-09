import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, Subject, map, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../auth/user';
import { TripCard } from '../trip/trip-cards';

import { PublicUser } from './public-user';
import { UserRequests } from './user-requests';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  private readonly _updatedSelf$ = new Subject<User>();
  public readonly updatedSelf$ = this._updatedSelf$.asObservable();

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

  updateProfile(data: UserRequests.UpdateProfile.Request) {
    const payload = {
      name: data.name?.trim(),
      bio: data.bio?.trim(),
      email: data.email?.trim(),
      avatar: data.avatar,
    } satisfies UserRequests.UpdateProfile.Request;
    return this.httpClient
      .put<UserRequests.UpdateProfile.Response>(environment.api.endpoint + '/update-profile', payload)
      .pipe(
        map((response) => response.user),
        tap(({ id, avatar, bio, email, name }) => {
          this._updatedSelf$.next({ id, avatar, bio, email, name });
        })
      );
  }

  updateEmail(newEmail: string, currentPassword: string) {
    const payload = {
      newEmail: newEmail.trim(),
      currentPassword,
    } satisfies UserRequests.UpdateEmail.Request;

    return this.httpClient
      .put<UserRequests.UpdateEmail.Response>(environment.api.endpoint + '/settings/change-email', payload)
      .pipe(
        map((response) => response.user),
        tap(({ _id: id, avatar, bio, email, name }) => {
          this._updatedSelf$.next({ id, avatar, bio, email, name });
        })
      );
  }

}
