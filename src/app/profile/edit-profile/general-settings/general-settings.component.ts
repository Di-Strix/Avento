import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, finalize, tap } from 'rxjs';

import { AuthService } from '../../../shared/auth/auth.service';
import { User } from '../../../shared/auth/user';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-general-settings',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss',
})
export class GeneralSettingsComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    bio: new FormControl('', { nonNullable: true }),
  });

  user?: User;

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(
        filter((user) => !!user),
        tap((user) => {
          this.user = user;
        }),
        filter((user) => this.isDistinct(user)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((user) => {
        this.form.patchValue({
          name: user.name,
          bio: user.bio,
        });
      });
  }

  update() {
    if (this.form.invalid) return;
    if (!this.user) return;
    if (this.form.disabled) return;

    const { name, bio } = this.form.getRawValue();
    this.form.disable();

    if (!this.isDistinct(this.user)) return;

    this.userService
      .updateProfile({ name, bio })
      .pipe(finalize(() => this.form.enable()))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  isDistinct(user: User) {
    const formData = this.form.getRawValue();
    return formData.name.trim() !== user.name || formData.bio.trim() !== user.bio;
  }

  private handleError(error: HttpErrorResponse) {
    this.snackBar.open(error.error?.message || error.message, 'okay :(', {
      panelClass: 'snackbar-error',
      duration: 3000,
    });

    console.error(error);
  }
}
