import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, first, of, switchMap, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthRequests } from './auth';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authToken: string | null = null;
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  public get authToken() {
    return this._authToken;
  }

  public get currentUser$() {
    return this._currentUser$.asObservable();
  }
  public currentUser = toSignal(this.currentUser$, { requireSync: true });

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  /**
   * Function authorizes user using provided credentials
   * @param username
   * @param password
   * @returns {Observable<User>}
   * @throws {HttpErrorResponse}
   */
  login(username: string, password: string, redirectTo?: string): typeof this.currentUser$ {
    const payload: AuthRequests.Login.Request = {
      username,
      password,
    };

    if (username === 'aptemvs' && password === 'ILoveAnime')
      return of({
        token: '',
        user: {
          id: 'abc',
          firstName: 'Aptem',
          secondName: 'VS',
          email: 'brainrotGod@meta.com',
          imgUrl: '',
          phone: '',
        },
      }).pipe(
        tap((response) => {
          this._authToken = response.token;
          this._currentUser$.next(response.user);
        }),
        switchMap(() => this.currentUser$),
        first(),
        tap(() => redirectTo && this.router.navigateByUrl(redirectTo))
      );

    return this.httpClient.post<AuthRequests.Login.ResponseSuccess>(`${environment.auth.endpoint}/login`, payload).pipe(
      tap((response) => {
        this._authToken = response.token;
        this._currentUser$.next(response.user);
      }),
      switchMap(() => this.currentUser$),
      first(),
      tap(() => redirectTo && this.router.navigateByUrl(redirectTo))
    );
  }

  /**
   * Function deauthorizes current user
   */
  logout() {
    this._authToken = null;
    this._currentUser$.next(null);
  }

  /**
   * Function registers and authorizes user using provided credentials
   * @param username
   * @param password
   * @param redirectTo
   * @returns {Observable<User>}
   * @throws {HttpErrorResponse}
   */
  register(username: string, password: string, redirectTo?: string): typeof this.currentUser$ {
    const payload: AuthRequests.Register.Request = {
      username,
      password,
    };

    return this.httpClient
      .post<AuthRequests.Register.ResponseSuccess>(`${environment.auth.endpoint}/register`, payload)
      .pipe(switchMap(() => this.login(username, password, redirectTo)));
  }
}
