import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { finalize } from 'rxjs';

import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'app-password-settings',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './password-settings.component.html',
  styleUrl: './password-settings.component.scss',
})
export class PasswordSettingsComponent {
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild('resetButton') resetButtonRef!: ElementRef<HTMLButtonElement>;

  form = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
  });

  update() {
    if (this.form.invalid) return;
    if (this.form.disabled) return;

    const { password, newPassword } = this.form.getRawValue();
    this.form.disable();

    this.userService
      .updatePassword(password, newPassword)
      .pipe(
        finalize(() => {
          this.form.enable();

          // Dirty hack to reset matInput's error state
          this.resetButtonRef.nativeElement.click();
        })
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  passwordErrorMessage(control: AbstractControl<string>): string {
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
