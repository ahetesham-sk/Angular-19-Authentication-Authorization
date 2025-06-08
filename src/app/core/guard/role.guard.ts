import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data?.['roles'] as string[]; // roles from route
  const userRole = authService.getUserRole();

  const isLoggedIn = authService.isLoggedIn();
  const isAuthorized = expectedRoles?.includes(userRole);

  if (!isLoggedIn || !isAuthorized) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
