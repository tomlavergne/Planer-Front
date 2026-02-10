import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslationKey, AvailableLocale } from './translation-schema.type';
import { Observable } from 'rxjs';

/**
 * Service helper pour simplifier l'utilisation de Transloco avec typage fort
 */
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private transloco = inject(TranslocoService);

  /**
   * Traduit une clé avec validation de type à la compilation
   * @param key - Clé de traduction (autocomplétion disponible)
   * @param params - Paramètres optionnels pour interpolation
   */
  translate(key: TranslationKey, params?: Record<string, any>): string {
    return this.transloco.translate(key, params);
  }

  /**
   * Traduit une clé de manière réactive
   * @param key - Clé de traduction
   * @param params - Paramètres optionnels pour interpolation
   */
  translate$(key: TranslationKey, params?: Record<string, any>): Observable<string> {
    return this.transloco.selectTranslate(key, params);
  }

  /**
   * Change la langue active
   * @param locale - Code de la langue
   */
  setLanguage(locale: AvailableLocale): void {
    this.transloco.setActiveLang(locale);
  }

  /**
   * Retourne la langue active
   */
  getActiveLanguage(): AvailableLocale {
    return this.transloco.getActiveLang() as AvailableLocale;
  }

  /**
   * Vérifie si une traduction existe
   * @param key - Clé de traduction
   */
  hasTranslation(key: TranslationKey): boolean {
    const translation = this.transloco.translate(key);
    return translation !== key;
  }

  /**
   * Retourne toutes les langues disponibles
   */
  getAvailableLanguages(): AvailableLocale[] {
    return this.transloco.getAvailableLangs() as AvailableLocale[];
  }
}
