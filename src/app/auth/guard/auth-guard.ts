import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as AuthConstants from '../constants/auth.constants'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUserTokenExpired()) {
    return true;
  }
  router.navigate([AuthConstants.USER_NOT_AUTHENTICATED_DEFAULT_URL]);
  return false;
};