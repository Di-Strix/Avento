import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

import { IntersectionObserverDirective } from '../../intersection-observer/intersection-observer.directive';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-notifications-panel',
  imports: [MatListModule, RouterLink, IntersectionObserverDirective],
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.scss',
})
export class NotificationsPanelComponent {
  readonly notificationService = inject(NotificationService);

  markSeen(commentId: string) {
    this.notificationService.markAsSeen(commentId).subscribe();
  }
}
