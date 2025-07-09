import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/auth/user';
import { HeaderComponent } from '../../shared/header/header.component';
import { IdentityPanelComponent } from '../../shared/identity-panel/identity-panel.component';

import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';

@Component({
  selector: 'app-edit-profile',
  imports: [
    HeaderComponent,
    MatTabsModule,
    GeneralSettingsComponent,
    MatTabsModule,
    EmailSettingsComponent,
    PasswordSettingsComponent,
    IdentityPanelComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  user: User | null = null;

  constructor(
    public authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => (this.user = user));
  }
}
