import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';

import { map } from 'rxjs';

import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/auth/user';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IdentityPanelComponent } from '../../shared/components/identity-panel/identity-panel.component';

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
  private readonly breakpointObserver = inject(BreakpointObserver);

  user: User | null = null;
  compactDesign = toSignal(this.breakpointObserver.observe('(width <= 620px)').pipe(map((state) => state.matches)));

  constructor(
    public authService: AuthService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => (this.user = user));
  }
}
