import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
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
  {
    path: 'profile',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
    ],
    canMatch: [authGuard],
  },
  { path: 'user/:userId', component: PublicProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent },
];
