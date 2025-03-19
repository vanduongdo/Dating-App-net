import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize, identity } from 'rxjs';
import { environment } from '../../environments/environment';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();

  return next(req).pipe(
    (environment.production ? identity : delay(0)), // identity is a rxjs operator that does nothing, but it's useful for type inference, 
    // it's same like `tap(() => {})` or `map(x => x)` or null if you don't want to do anything, but you need to return an observable
    // tslint:disable-next-line: deprecation
    finalize(() => {
      busyService.idle();
    })
  );
};
