import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

import { CommentNotification } from '../../notification/notification';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-notification',
  imports: [MatIcon, MatSnackBarModule, MatButton, RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  readonly snackBar = inject(MatSnackBarRef);
  readonly notificationService = inject(NotificationService);
  readonly notification?: CommentNotification = inject(MAT_SNACK_BAR_DATA);

  close(event: Event) {
    event.stopImmediatePropagation();

    this.snackBar.dismissWithAction();

    if (this.notification) this.notificationService.markAsSeen(this.notification.id).subscribe();
  }
}
