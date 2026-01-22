import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckPermissionService } from '../services/check-permission.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const checkPermissionService = inject(CheckPermissionService);
  const router = inject(Router);

  if (checkPermissionService.checkPermission()) {
    return true;
  } else {
    router.navigate(['/403-forbidden']);
  }

  return false;
};
