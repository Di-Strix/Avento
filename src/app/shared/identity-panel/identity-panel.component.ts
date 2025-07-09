import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { PublicUser } from '../user/public-user';

@Component({
  selector: 'app-identity-panel',
  imports: [MatIconModule],
  templateUrl: './identity-panel.component.html',
  styleUrl: './identity-panel.component.scss',
})
export class IdentityPanelComponent {
  @Input({ required: true }) user!: PublicUser;

  private _horizontal: boolean = false;
  @Input() set horizontal(value: BooleanInput) {
    this._horizontal = coerceBooleanProperty(value);
  }
  get horizontal() {
    return this._horizontal;
  }
}
