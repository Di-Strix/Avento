import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Trip } from '../trip';

import { TripCard } from './trip-cards';
import { TripRequests } from './trip-requests';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  publishTrip(trip: TripRequests.Publish.Request) {
    return this.httpClient.post<TripRequests.Publish.Response>(environment.api.endpoint + '/trips', trip);
  }

  loadTripView(tripId: string): Observable<Trip> {
    return this.httpClient.get<TripRequests.FetchView.Response>(environment.api.endpoint + '/trips/' + tripId).pipe(
      map((trip) => ({
        ...trip,
        plan: trip.plan.map((item) => {
          if (item.type !== 'flight') return item;
          const from = item.connections.at(0)?.cityName || '';
          const to = item.connections.at(-1)?.cityName || '';

          return {
            type: item.type,
            from,
            to,
            connections: item.connections,
          } satisfies Trip.Plan.Flight;
        }),
        comments: trip.comments.map(
          ({ author, title, content }) =>
            ({
              author,
              title,
              content,
            }) satisfies Trip.Comment
        ),
      }))
    );
  }

  loadTripsSuggestions(): Observable<TripCard[]> {
    return this.httpClient
      .get<TripRequests.FetchCards.Response>(environment.api.endpoint + '/trips')
      .pipe(map((cards) => this.transformCards(cards)));
  }

  loadUserTrips(): Observable<TripCard[]> {
    return this.httpClient
      .get<TripRequests.FetchCards.Response>(environment.api.endpoint + '/my-trips')
      .pipe(map((cards) => this.transformCards(cards)));
  }

  loadFavoriteTrips(): Observable<TripCard[]> {
    return this.httpClient
      .get<TripRequests.FetchCards.Response>(environment.api.endpoint + '/favourites')
      .pipe(map((cards) => this.transformCards(cards)));
  }

  postComment(tripId: string, payload: TripRequests.PostComment.Request): Observable<Trip.Comment> {
    return this.httpClient
      .post<TripRequests.PostComment.Response>(environment.api.endpoint + '/trips/' + tripId + '/comments', payload)
      .pipe(
        map((response) => {
          const user = this.authService.currentUser();

          return {
            author: {
              name: user?.name || '',
              id: user?.id || '',
            },
            title: response.comment.title,
            content: response.comment.content,
          };
        })
      );
  }

  private transformCards(response: TripRequests.FetchCards.Response): TripCard[] {
    return response.map(
      (card) =>
        ({
          author: {
            name: card.authorName,
            id: card.authorId,
          } satisfies Trip.Author,

          name: card.name,
          id: card.id,
          price: card.price,
          duration: card.duration,
          imageUrl: card.image,
        }) satisfies TripCard
    );
  }
}
