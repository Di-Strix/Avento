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
}
