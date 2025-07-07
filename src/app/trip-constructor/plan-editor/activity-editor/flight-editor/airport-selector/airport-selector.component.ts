import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Observable, Subject, delay, startWith, switchMap } from 'rxjs';

import { AirportService } from '../../../../../shared/airport/airport.service';
import { airports } from '../../../../../shared/airport/airports';
import { Trip } from '../../../../../shared/trip';
import { TripForm } from '../../../../trip-form';

@Component({
  selector: 'app-airport-selector',
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './airport-selector.component.html',
  styleUrl: './airport-selector.component.scss',
})
export class AirportSelectorComponent implements OnInit {
  @ViewChild('selector', { static: true }) input!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) control!: TripForm.Plan.Flight.Entity;

  filterRequest = new Subject<string>();
  filteredOptions = new Observable<Trip.Plan.Flight.Entity[]>();

  constructor(
    private destroyRef: DestroyRef,
    private airportService: AirportService
  ) {
    this.displayFn = this.displayFn.bind(this);
  }

  ngOnInit(): void {
    // MatAutocomplete does not respect non-nullability and writes null in some cases
    this.control.valueChanges.pipe(delay(1), takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      if (v === null) this.control.setValue('');
    });

    this.filteredOptions = this.filterRequest.pipe(
      switchMap((query) => this.airportService.query(query).pipe(startWith([])))
    );
  }

  displayFn(airportId?: string): string {
    return (airportId && this.airportService.getSync(airportId)?.displayName) || '';
  }

  filter() {
    const filterValue = this.input.nativeElement.value.trim();
    this.filterRequest.next(filterValue);
  }
}
