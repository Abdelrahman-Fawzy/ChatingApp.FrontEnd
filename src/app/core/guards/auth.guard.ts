import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from '../services/toastr.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (accountService.currentUser()) return true;
  else {
    toastr.error('ليس لديك صلاحية');
    router.navigateByUrl('/home');
    return false;
  }
};
