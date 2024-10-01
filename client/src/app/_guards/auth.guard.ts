import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  // This is where you would check if the user is logged in
  // If they are logged in, return true, otherwise return false
  let accountService = inject(AccountService);
  const toasts = inject(ToastrService);

  if (!accountService.currentUser()) {
    toasts.error('You shall not pass!');
    return false;
  }

  return true;
};
