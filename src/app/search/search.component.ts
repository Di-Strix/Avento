import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { filter, finalize, map } from 'rxjs';

import { HeaderComponent } from '../shared/header/header.component';
import { TripPreviewCardComponent } from '../shared/trip-preview-card/trip-preview-card.component';
import { TripCard } from '../shared/trip/trip-cards';
import { TripService } from '../shared/trip/trip.service';

@Component({
  selector: 'app-search',
  imports: [
    HeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    TripPreviewCardComponent,
    RouterLink,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tripService = inject(TripService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  compactDesign = toSignal(this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches)));

  searchGroup = new FormGroup({
    from: new FormControl('Vienna', { nonNullable: true }),
    to: new FormControl('', { nonNullable: true }),
  });

  trips: TripCard[] = [];
  loading = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((params) => ({ from: params?.['from'] || '', to: params?.['to'] || '' })),
        filter(({ from, to }) => {
          const current = this.searchGroup.getRawValue();
          return from !== current.from || to !== current.to;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ from, to }) => {
        this.searchGroup.patchValue({ from, to });
        this.search();
      });
  }

  search() {
    this.loading = true;

    let { from, to } = this.searchGroup.getRawValue();

    if (!from && !to) {
      from = this.searchGroup.controls.from.defaultValue;
    }

    this.router.navigate([], {
      queryParams: { from, to },
    });

    this.tripService
      .searchTrips(from, to)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((cards) => {
        this.trips = cards;
      });
  }
}
