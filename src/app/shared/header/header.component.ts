import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIcon, MatIconButton, RouterLink],
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
