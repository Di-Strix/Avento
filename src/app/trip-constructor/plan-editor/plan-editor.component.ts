import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs';

import { Trip } from '../../shared/trip';
import { createAttraction, createFlight, createStay } from '../helpers';
import { TripForm } from '../trip-form';

import { ActivityEditorComponent } from './activity-editor/activity-editor.component';
import { ActivityHeaderComponent } from './activity-header/activity-header.component';
import { ActivityMenuItem, AddActivityMenuComponent } from './add-activity-menu/add-activity-menu.component';

@Component({
  selector: 'app-plan-editor',
  imports: [
    CommonModule,
    MatAccordion,
    MatExpansionModule,
    CdkDrag,
    CdkDropList,
    MatIconModule,
    CdkDragHandle,
    MatButtonModule,
    AddActivityMenuComponent,
    ActivityHeaderComponent,
    ActivityEditorComponent,
  ],
  templateUrl: './plan-editor.component.html',
  styleUrl: './plan-editor.component.scss',
})
export class PlanEditorComponent {
  ACTIVITY_MENU_ENTRIES: ActivityMenuItem[] = [
    { value: 'flight', icon: 'airlines', displayName: 'Flight' },
    { value: 'stay', icon: 'hotel', displayName: 'Stay' },
    { value: 'attraction', icon: 'explore', displayName: 'Attraction' },
  ];

  private _formArray!: FormArray<TripForm.Plan.Item>;
  @Input({ required: true }) set formArray(form: FormArray<TripForm.Plan.Item>) {
    this._formArray = form;

    this.cityIds$ = form.valueChanges.pipe(
      startWith(null),
      map(() => this.formArray.getRawValue()),
      map((values) => {
        let currentCityId: string | undefined = undefined;

        return values.map((item) => {
          if (item.type !== 'flight') return currentCityId;
          if (item.connections.length < 2) return currentCityId;

          currentCityId = item.connections.at(-1)?.value || undefined;
          return currentCityId;
        });
      }),
      distinctUntilChanged((prev, current) => prev.join() === current.join()),
      shareReplay(1)
    );
  }
  get formArray() {
    return this._formArray;
  }

  cityIds$!: Observable<Array<string | undefined>>;

  constructor() {
    this.dropPredicate = this.dropPredicate.bind(this);
  }

  createActivity(type: Trip.Plan.Item['type'], index: number) {
    if (index <= 0 || index >= this.formArray.length - 1) return;

    let activity: TripForm.Plan.Item;

    switch (type) {
      case 'flight':
        activity = createFlight();
        break;
      case 'stay':
        activity = createStay();
        break;
      case 'attraction':
        activity = createAttraction();
        break;
      default:
        throw new Error(`unknown activity type ${type}`);
    }

    this.formArray.insert(index, activity);
  }

  removeActivity(index: number) {
    if (index <= 0) return;
    if (index >= this.formArray.controls.length - 1) return;

    this.formArray.removeAt(index);
  }

  drop(event: CdkDragDrop<void>) {
    const srcIndex = event.previousIndex;
    const targetIndex = event.currentIndex;

    if (srcIndex === targetIndex) return;

    const dropAllowed = this.dropPredicate(targetIndex, event.item, event.container);
    if (!dropAllowed) return;

    moveItemInArray(this.formArray.controls, srcIndex, targetIndex);
  }

  dropPredicate(index: number, drag: CdkDrag<any>, drop: CdkDropList<any>): boolean {
    if (index <= 0) return false;
    if (index >= this.formArray.controls.length - 1) return false;

    return true;
  }
}
