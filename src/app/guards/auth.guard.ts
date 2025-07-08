import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) return true;

  router.navigate(['/login'], {
    queryParams: {
      redirectTo: router.url,
    },
  });

  return false;
};
