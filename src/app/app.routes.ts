import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TripConstructorComponent } from './trip-constructor/trip-constructor.component';
import { TripViewComponent } from './trip-view/trip-view.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'trip',
    children: [
      { path: 'create', component: TripConstructorComponent, canMatch: [authGuard] },
      { path: ':id', component: TripViewComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canMatch: [authGuard] },
  { path: '**', component: PageNotFoundComponent },
];
