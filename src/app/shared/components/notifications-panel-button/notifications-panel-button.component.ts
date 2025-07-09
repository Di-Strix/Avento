import { Component, inject } from '@angular/core';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../notification/notification.service';
import { NotificationsPanelComponent } from '../notifications-panel/notifications-panel.component';

@Component({
  selector: 'app-notifications-panel-button',
  imports: [NotificationsPanelComponent, MatMenuModule, MatIconButton, MatIcon, MatBadgeModule],
  templateUrl: './notifications-panel-button.component.html',
  styleUrl: './notifications-panel-button.component.scss',
})
export class NotificationsPanelButtonComponent {
  readonly notificationService = inject(NotificationService);
  readonly authService = inject(AuthService);
}
