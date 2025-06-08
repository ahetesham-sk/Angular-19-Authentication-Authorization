import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  // Check if the user is logged in
  if (!authService.isLoggedIn()) {
    // If not logged in, redirect to the login page
    window.alert('You must be logged in to access this page.');
    router.navigate(['/login']);
    return false;
  }
  else {
    return true;
  }

};
