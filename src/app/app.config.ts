import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideIcons } from '@ng-icons/core';
import * as lucideIcons from '@ng-icons/lucide';
import { ThemeService } from './shared/config/theme.service';

/**
 * Fonction d'initialisation du thème
 * Cette fonction force l'instanciation du ThemeService au démarrage
 */
function initializeTheme(themeService: ThemeService) {
  return () => {
    // Le service s'auto-initialise dans son constructeur
    // Cette fonction garantit juste qu'il est instancié au démarrage
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIcons(lucideIcons),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
  ],
};
