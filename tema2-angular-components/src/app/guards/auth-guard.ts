import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const usersService: UsersService = inject(UsersService);
  const storageService: StorageService = inject(StorageService);

  const savedUsername: string | null = storageService.getItem('rememberedUsername');

  if(usersService.isLoggedIn()) {
    return true;
  }

  if (savedUsername) {
    const userExists = usersService.getUsers().find(user => user.username === savedUsername) ?? null;

    if (userExists) {
      usersService.setSelectedUser(userExists);
      return true;
    } else {
      router.navigate(['/login-register']);
      return false;
    }

  }

  router.navigate(['/login-register']);
  return false;
};
