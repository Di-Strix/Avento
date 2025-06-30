import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

import { tap } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-login',
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() redirectTo: string = '/';

  showPassword: boolean = false;
  loading: boolean = false;

  credentials = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(
    public authService: AuthService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  usernameErrorMessage(): string {
    const control = this.credentials.controls.username;

    if (control.hasError('required')) return 'Username or email is required';
    if (control.hasError('minlength')) return 'Username or email is too short';

    return '';
  }

  passwordErrorMessage(): string {
    const control = this.credentials.controls.password;

    if (control.hasError('required')) return 'Password is required';
    if (control.hasError('minlength')) return 'Password too short';

    return '';
  }

  onSubmit() {
    if (this.credentials.invalid) return;
    if (this.loading) return;

    const { username, password } = this.credentials.getRawValue();

    this.credentials.disable();
    this.loading = true;

    this.authService
      .login(username, password, this.redirectTo)
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
