import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

/**
 * Loader Transloco qui charge les traductions depuis des fichiers TypeScript
 *
 * Avantages par rapport aux fichiers JSON :
 * ✅ Validation à la compilation
 * ✅ Cohérence garantie entre les langues
 * ✅ Autocomplétion native
 * ✅ Possibilité d'ajouter des commentaires
 * ✅ Refactoring plus sûr
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    // Import dynamique des fichiers de traduction TypeScript
    switch (lang) {
      case 'fr':
        return new Observable((observer) => {
          import('../../../assets/i18n/fr').then((module) => {
            observer.next(module.frTranslations);
            observer.complete();
          });
        });

      case 'en':
        return new Observable((observer) => {
          import('../../../assets/i18n/en').then((module) => {
            observer.next(module.enTranslations);
            observer.complete();
          });
        });

      default:
        console.error(`Langue non supportée: ${lang}`);
        return of({});
    }
  }
}
