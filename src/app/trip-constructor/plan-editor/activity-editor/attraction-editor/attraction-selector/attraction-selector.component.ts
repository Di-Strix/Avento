import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, Input, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable, Subject, delay, startWith, switchMap } from 'rxjs';

import { AttractionService } from '../../../../../shared/attraction/attraction.service';
import { Trip } from '../../../../../shared/trip';
import { TripForm } from '../../../../trip-form';

@Component({
  selector: 'app-attraction-selector',
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './attraction-selector.component.html',
  styleUrl: './attraction-selector.component.scss',
})
export class AttractionSelectorComponent {
  @ViewChild('selector', { static: true }) input!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) control!: TripForm.Plan.Attraction.Entity;
  @Input() cityId?: string | null;
  @Input() tooltip?: string;

  @Input() set disabled(state: BooleanInput) {
    const disabled = coerceBooleanProperty(state);
    if (disabled) this.control.disable({ emitEvent: false });
    else this.control.enable({ emitEvent: false });
  }

  _disabled: boolean = false;

  filterRequest = new Subject<string>();
  filteredOptions = new Observable<Trip.Plan.Attraction.Entity[]>();

  constructor(
    private destroyRef: DestroyRef,
    private attractionService: AttractionService
  ) {
    this.displayFn = this.displayFn.bind(this);
  }

  ngOnInit(): void {
    // MatAutocomplete does not respect non-nullability and writes null in some cases
    this.control.valueChanges.pipe(delay(1), takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      if (v === null) this.control.setValue('');
    });

    this.filteredOptions = this.filterRequest.pipe(
      switchMap((query) => this.attractionService.query(query, this.cityId).pipe(startWith([])))
    );
  }

  displayFn(attractionId?: string): string {
    return (attractionId && this.attractionService.getSync(attractionId)?.displayName) || '';
  }

  filter() {
    const filterValue = this.input.nativeElement.value.trim();
    this.filterRequest.next(filterValue);
  }
}
