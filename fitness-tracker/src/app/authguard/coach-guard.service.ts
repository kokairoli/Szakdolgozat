import { inject, Injectable } from '@angular/core';
import { UserStorageService } from '../services/UserStorage/user-storage.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoachGuardService {
  private readonly userStorageService = inject(UserStorageService);
  private readonly router = inject(Router);
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.userStorageService.isLoggedIn() &&
      !this.userStorageService.isClient()
    ) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}

export const CoachAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(CoachGuardService).canActivate(next, state);
};
