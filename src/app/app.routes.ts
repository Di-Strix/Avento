import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TripViewComponent } from './trip-view/trip-view.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'trip/:id', component: TripViewComponent },
  { path: '**', redirectTo: '' },
];
