import { Injectable } from '@angular/core';

import { Subject, map, of, retry, switchMap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

import { Message } from './message';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  private readonly _bus$;

  get notifications$() {
    return this._bus$.pipe(switchMap(({ notifications$ }) => notifications$));
  }

  get bus$() {
    return this._bus$.pipe(map(({ bus }) => bus));
  }

  constructor(private readonly authService: AuthService) {
    const openSubject$ = new Subject<Event>();
    openSubject$.pipe(map((e) => e.target as WebSocket)).subscribe((e) => e.send(JSON.stringify(this.authMessage())));

    this._bus$ = this.authService.currentUser$.pipe(
      map((user) => ({
        bus: user && webSocket<Message>({ url: environment.ws.endpoint, openObserver: openSubject$ }),
      })),
      map(({ bus }) => ({
        bus,
        notifications$: this.multiplex(bus, 'new_notification'),
      }))
    );
  }

  private authMessage(): Message {
    return { type: 'authenticate', payload: this.authService.authToken };
  }

  private multiplex<T extends Message>(bus: WebSocketSubject<T> | null, subscribeTo: string) {
    return (
      bus
        ?.multiplex(
          () => ({ type: 'subscribe', payload: subscribeTo }),
          () => ({ type: 'unsubscribe', payload: subscribeTo }),
          (msg) => msg?.type === subscribeTo
        )
        .pipe(retry({ delay: 5000 })) || of()
    );
  }
}
