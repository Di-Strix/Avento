import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Trip } from '../../../shared/trip';

export interface ActivityMenuItem {
  icon: string;
  displayName: string;
  value: Trip.Plan.Item['type'];
}

@Component({
  selector: 'app-add-activity-menu',
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './add-activity-menu.component.html',
  styleUrl: './add-activity-menu.component.scss',
})
export class AddActivityMenuComponent {
  @Input({ required: true }) entries!: ActivityMenuItem[];
  @Output() create = new EventEmitter<Trip.Plan.Item['type']>();
}
