import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { Observable, distinctUntilChanged, filter, map, merge, of, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { MessagingService } from '../messaging/messaging.service';

import { CommentNotification } from './notification';
import { NotificationRequests } from './notification-requests';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _allNotifications = signal<CommentNotification[]>([]);

  allNotifications = this._allNotifications.asReadonly();
  readonly allNotifications$ = toObservable(this.allNotifications);

  readonly unread = computed(() => this.allNotifications().filter(({ read }) => !read).length);

  constructor(
    private readonly authService: AuthService,
    private readonly messagingService: MessagingService,
    private readonly httpClient: HttpClient
  ) {
    this.authService.currentUser$
      .pipe(
        distinctUntilChanged((prev, curr) => prev?.id === curr?.id),
        tap(() => {
          this._allNotifications.set([]);
        }),
        filter((user) => !!user),
        switchMap(() => this.createMessageStream()),
        takeUntilDestroyed()
      )
      .subscribe((message) => {
        this._allNotifications.update((notifications) => {
          const updatedNotifications = [message, ...notifications];

          if (updatedNotifications.length >= 2 && updatedNotifications[0].createdAt < updatedNotifications[1].createdAt)
            updatedNotifications.slice(0).sort(this.dateSorter);

          return updatedNotifications;
        });
      });
  }

  markAsSeen(id: string): Observable<void> {
    const payload = {} satisfies NotificationRequests.MarkNotificationRead.Request;

    return this.httpClient
      .put<NotificationRequests.MarkNotificationRead.Response>(
        environment.api.endpoint + '/notifications/' + id + '/read',
        payload
      )
      .pipe(
        tap(() => {
          this._allNotifications.update((notifications) =>
            notifications.map((notification) => {
              if (notification.id === id) return { ...notification, read: true };
              return notification;
            })
          );
        }),
        map(() => {})
      );
  }

  private dateSorter(a: CommentNotification, b: CommentNotification) {
    return a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds();
  }

  private createMessageStream(): Observable<CommentNotification> {
    const missed$ = this.loadMissedNotifications();

    // Subscribe to bus feed and emit notifications into _notification$
    const new$ = this.messagingService.notifications$.pipe(
      map((message) => message.payload),
      map(
        (message) =>
          ({
            ...message,
            createdAt: new Date(message.createdAt),
          }) satisfies CommentNotification
      )
    );

    return merge(missed$, new$);
  }

  private loadMissedNotifications() {
    // Download all unread notifications and spread them
    return this.getNotifications().pipe(
      switchMap((notifications) => of(...notifications)),
      map(
        (notification) =>
          ({ ...notification, createdAt: new Date(notification.createdAt) }) satisfies CommentNotification
      )
    );
  }

  private getNotifications(includingSeen: boolean = false) {
    const payload = { read: includingSeen } satisfies NotificationRequests.GetNotifications.Request;
    return this.httpClient.get<NotificationRequests.GetNotifications.Response>(
      environment.api.endpoint + '/notifications',
      { params: payload }
    );
  }
}
