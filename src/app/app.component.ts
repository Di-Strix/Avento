import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';

import { distinctUntilKeyChanged, filter, map, throttleTime } from 'rxjs';

import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './shared/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly notificationService = inject(NotificationService);
  private readonly snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.notificationService.allNotifications$
      .pipe(
        filter(() => !!this.notificationService.unread()),
        throttleTime(3500, undefined, { leading: true, trailing: false }),
        map((notifications) => notifications[0]),
        distinctUntilKeyChanged('id'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((notification) => {
        this.snackBar.openFromComponent(NotificationComponent, {
          data: notification,
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }
}
