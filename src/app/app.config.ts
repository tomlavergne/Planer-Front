import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideIcons } from '@ng-icons/core';
import * as lucideIcons from '@ng-icons/lucide';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIcons(lucideIcons),
  ]
};
