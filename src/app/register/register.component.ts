import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import { merge, tap } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-register',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Input() redirectTo: string = '/';

  loading: boolean = false;

  credentials = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    repeatPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), ValidatorSame('password')],
    }),
  });

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    // Update validity of all interlocked controls when any of them changes
    const controls = this.credentials.controls;
    const interlocked = [controls.password, controls.repeatPassword];
    merge(...interlocked.map((control) => control.valueChanges)).subscribe(() => {
      interlocked.forEach((control) => control.updateValueAndValidity({ emitEvent: false }));
    });
  }

  emailErrorMessage(): string {
    const control = this.credentials.controls.email;

    if (control.hasError('email')) return 'Not a valid email';

    return '';
  }

  passwordErrorMessage(control: AbstractControl<string>): string {
    if (control.hasError('minlength')) return 'Password too short';
    if (control.hasError('same')) return 'Passwords are not the same';

    return '';
  }

  onSubmit() {
    if (this.credentials.invalid) return;
    if (this.loading) return;

    const { name, email, password } = this.credentials.getRawValue();

    this.credentials.disable();
    this.loading = true;

    this.authService
      .register({ name, email, password }, this.redirectTo)
      .pipe(
        tap({
          finalize: () => {
            this.loading = false;
            this.credentials.enable();
          },
        })
      )
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.snackBar.open(err.message, 'close', { duration: 3000 });
          console.error(err);
        },
      });
  }
}

function ValidatorSame(referenceControlPath: string): ValidatorFn {
  return (control) => {
    let parent = control;
    if (!control.parent) return null;

    while (parent.parent) {
      parent = parent.parent;
    }

    const reference = parent.get(referenceControlPath);
    if (!reference) throw new Error(`Reference control could to be found by path ${referenceControlPath}`);

    if (reference.value === control.value) return null;
    return { same: true };
  };
}
