import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])),
        // Add more providers here
        provideAnimations(),
        provideToastr({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        importProvidersFrom(NgxSpinnerModule, TimeagoModule.forRoot(), ModalModule.forRoot()), 
        // forRoot() must be called once in the root module, how forRoot() works? it is a provider factory that returns an array of providers to be used in the root module
    ]
};
