import { ApplicationConfig, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideIcons } from '@ng-icons/core';
import * as lucideIcons from '@ng-icons/lucide';
import * as phosphorIcons from '@ng-icons/phosphor-icons/regular';
import { ThemeService } from './shared/config/theme.service';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';

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

/**
 * Fonction d'initialisation de la langue
 * Charge la langue préférée depuis localStorage au démarrage
 */
function initializeLanguage(translocoService: any) {
  return () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && ['fr', 'en'].includes(preferredLanguage)) {
      translocoService.setActiveLang(preferredLanguage);
    }
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideIcons({ ...lucideIcons, ...phosphorIcons }),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTheme,
      deps: [ThemeService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLanguage,
      deps: [TranslocoService],
      multi: true,
    },
  ],
};
