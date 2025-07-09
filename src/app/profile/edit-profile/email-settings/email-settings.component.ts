import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, finalize, tap } from 'rxjs';

import { AuthService } from '../../../shared/auth/auth.service';
import { User } from '../../../shared/auth/user';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-email-settings',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './email-settings.component.html',
  styleUrl: './email-settings.component.scss',
})
export class EmailSettingsComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('resetButton') resetButtonRef!: ElementRef<HTMLButtonElement>;

  form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
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
          email: user.email,
        });
      });
  }

  update() {
    if (this.form.invalid) return;
    if (!this.user) return;
    if (this.form.disabled) return;
    if (!this.isDistinct(this.user)) return;

    const { email, password } = this.form.getRawValue();
    this.form.disable();

    this.userService
      .updateEmail(email, password)
      .pipe(
        finalize(() => {
          this.form.enable();

          const { email } = this.form.getRawValue();

          // Dirty hack to reset matInput's error state
          this.resetButtonRef.nativeElement.click();

          this.form.controls.email.setValue(email);
        })
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  isDistinct(user: User) {
    const formData = this.form.getRawValue();
    return formData.email.trim() !== user.email;
  }

  emailErrorMessage(): string {
    const control = this.form.controls.email;

    if (control.hasError('email')) return 'Not a valid email';

    return '';
  }

  passwordErrorMessage(): string {
    const control = this.form.controls.password;

    if (control.hasError('minlength')) return 'Password is too short';

    return '';
  }

  private handleError(error: HttpErrorResponse) {
    this.snackBar.open(error.error?.message || error.message, 'okay :(', {
      panelClass: 'snackbar-error',
      duration: 3000,
    });

    console.error(error);
  }
}
