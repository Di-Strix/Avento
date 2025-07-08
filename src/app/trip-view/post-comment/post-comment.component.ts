import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Trip } from '../../shared/trip';
import { TripService } from '../../shared/trip/trip.service';

@Component({
  selector: 'app-post-comment',
  imports: [MatInput, MatFormField, MatLabel, FormsModule, ReactiveFormsModule, MatButton, MatError, MatHint],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
})
export class PostCommentComponent {
  private readonly tripService = inject(TripService);
  private readonly snackBar = inject(MatSnackBar);

  @Input({ required: true }) tripId!: string;
  @Output() onPosted = new EventEmitter<Trip.Comment>();

  @ViewChild('resetButton', { static: true }) resetButton!: ElementRef<HTMLButtonElement>;

  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.minLength(3), Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.minLength(5)] }),
  });

  postComment() {
    if (!this.tripId) return;
    if (this.form.invalid) return;

    this.form.disable();
    const { title, content } = this.form.getRawValue();

    this.tripService
      .postComment(this.tripId, { title, content })
      .pipe()
      .subscribe({
        next: (comment) => {
          this.form.enable();

          // Dirty hack to reset matInput's error state
          this.resetButton.nativeElement.click();

          this.onPosted.next(comment);
        },
        error: (err: HttpErrorResponse) => {
          this.form.enable();

          let message = '';

          if (err instanceof HttpErrorResponse) {
            message = err.error?.message || err.message;
          }

          this.snackBar.open(message, 'close', { duration: 3000, panelClass: 'snack-error' });
          console.error(err);
        },
      });
  }
}
