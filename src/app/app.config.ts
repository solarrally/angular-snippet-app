import { ApplicationConfig, ErrorHandler, importProvidersFrom, APP_INITIALIZER  } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { authInterceptor } from './auth/interceptors/auth.interceptor'; 
import { spinnerInterceptor } from './interceptors/spinner.interceptor';
import { GlobalErrorHandler } from './handlers/global-error-handler';
import { httpErrorInterceptor } from './interceptors/http-еrror.interceptor';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initializeTranslations(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('bg');
    return firstValueFrom(translate.use('bg'));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, spinnerInterceptor, httpErrorInterceptor])), 
    provideRouter(routes),
    provideClientHydration(withNoHttpTransferCache()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
    provideAnimationsAsync(),

    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslateService],
      multi: true
    }
  ]
};
