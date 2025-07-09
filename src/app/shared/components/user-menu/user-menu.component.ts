import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  login() {
    const isActive = this.router.isActive('/login', {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'ignored',
    });

    if (isActive) return;

    this.router.navigate(['/login'], {
      queryParams: {
        redirectTo: this.router.url,
      },
    });
  }
}
