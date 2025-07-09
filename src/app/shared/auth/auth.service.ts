import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { BehaviorSubject, first, merge, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

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

  public readonly currentUser$;
  public readonly currentUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private readonly userService: UserService
  ) {
    this.currentUser$ = merge(this._currentUser$, this.userService.updatedSelf$);
    this.currentUser = toSignal(this.currentUser$, { requireSync: true });
  }

  /**
   * Function authorizes user using provided credentials
   * @param username
   * @param password
   * @returns {Observable<User>}
   * @throws {HttpErrorResponse}
   */
  login(email: string, password: string, redirectTo?: string): typeof this.currentUser$ {
    const payload: AuthRequests.Login.Request = {
      email: email.trim(),
      password,
    };
    return this.httpClient.post<AuthRequests.Login.ResponseSuccess>(`${environment.auth.endpoint}/login`, payload).pipe(
      tap((response) => this.saveUser(response)),
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

    this.router.navigate([], { onSameUrlNavigation: 'reload' });
  }

  /**
   * Function registers and authorizes user using provided credentials
   * @param username
   * @param password
   * @param redirectTo
   * @returns {Observable<User>}
   * @throws {HttpErrorResponse}
   */
  register(data: AuthRequests.Register.Request, redirectTo?: string): typeof this.currentUser$ {
    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    } satisfies AuthRequests.Register.Request;

    return this.httpClient
      .post<AuthRequests.Register.ResponseSuccess>(`${environment.auth.endpoint}/register`, payload)
      .pipe(
        tap((response) => this.saveUser(response)),
        switchMap(() => this.currentUser$),
        first(),
        tap(() => redirectTo && this.router.navigateByUrl(redirectTo))
      );
  }

  private saveUser(response: AuthRequests.Login.ResponseSuccess | AuthRequests.Register.ResponseSuccess) {
    this._authToken = response.token;
    this._currentUser$.next(response.user);
  }
}
