import { Injectable, inject } from '@angular/core';
import { UserService } from '../services/UserService/user.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserStorageService } from '../services/UserStorage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
class AuthenticationGuardService {
  private readonly userStorageService = inject(UserStorageService);
  private readonly router = inject(Router);
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userStorageService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthenticationGuardService).canActivate(next, state);
};
