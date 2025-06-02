import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';

import { Trip } from '../../shared/trip';

@Component({
  selector: 'app-post-comment',
  imports: [MatInput, MatFormField, MatLabel, FormsModule, ReactiveFormsModule, MatButton, MatError, MatHint],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
})
export class PostCommentComponent {
  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.minLength(3), Validators.maxLength(30)],
      nonNullable: true,
    }),
    content: new FormControl<string>('', { nonNullable: true }),
  });

  postComment() {
    if (this.form.invalid) return;

    const { title, content } = this.form.getRawValue();
    const comment: Omit<Trip.Comment, 'author'> = {
      title,
      content,
    };
  }
}
