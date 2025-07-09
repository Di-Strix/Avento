import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { NotificationsPanelButtonComponent } from '../notifications-panel-button/notifications-panel-button.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, RouterLink, UserMenuComponent, NotificationsPanelButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input()
  get noBrand() {
    return this._noBrand;
  }
  set noBrand(value: BooleanInput) {
    this._noBrand = coerceBooleanProperty(value);
  }
  private _noBrand = false;
}
