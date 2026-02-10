/**
 * Exemple d'utilisation du système i18n avec typage fort
 */

import { Component, inject } from '@angular/core';
import { I18nService, TranslationKey } from '@core/i18n';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-i18n-example',
  imports: [TranslocoPipe],
  template: `
    <!-- Dans les templates, utilisez le pipe transloco -->
    <h1>{{ 'settings.general.label' | transloco }}</h1>

    <!-- Avec paramètres -->
    <p>{{ welcomeKey | transloco: { name: userName } }}</p>

    <!-- Button avec traduction sur attribut -->
    <button [title]="'common.back' | transloco">
      {{ 'common.back' | transloco }}
    </button>
  `,
})
export class I18nExampleComponent {
  private i18n = inject(I18nService);

  userName = 'John Doe';

  // ✅ TypeScript validera que cette clé existe
  // ✅ Vous aurez l'autocomplétion en tapant
  welcomeKey: TranslationKey = 'settings.general.preferences.label';

  ngOnInit() {
    // Exemple 1: Traduction simple avec typage
    const backLabel = this.i18n.translate('common.back');
    console.log(backLabel); // "Retour" ou "Back"

    // Exemple 2: Traduction avec paramètres
    const message = this.i18n.translate('auth.login.title');

    // ❌ Ceci causera une erreur TypeScript car la clé n'existe pas
    // const invalid = this.i18n.translate('nonexistent.key');

    // Exemple 3: Traduction réactive
    this.i18n.translate$('settings.general.label').subscribe((label) => {
      console.log('Label actuel:', label);
    });

    // Exemple 4: Changer de langue
    this.i18n.setLanguage('en');

    // Exemple 5: Vérifier si une traduction existe
    if (this.i18n.hasTranslation('common.back')) {
      console.log('La traduction existe');
    }
  }

  /**
   * Fonction helper pour obtenir des traductions dynamiques
   */
  getSettingLabel(section: string): string {
    // Construire dynamiquement une clé de traduction
    // Note: Le typage ne peut pas être vérifié pour les clés dynamiques
    const key = `settings.${section}.label` as TranslationKey;
    return this.i18n.translate(key);
  }

  /**
   * Exemple avec switch/case pour des clés typées
   */
  getStatusMessage(status: 'login' | 'preferences'): string {
    const keyMap: Record<string, TranslationKey> = {
      login: 'auth.login.title',
      preferences: 'settings.general.preferences.label',
    };

    const key = keyMap[status];
    return this.i18n.translate(key);
  }
}

/**
 * BONNES PRATIQUES:
 *
 * 1. Dans les templates HTML:
 *    - Utilisez toujours le pipe transloco: {{ 'key' | transloco }}
 *    - i18n Ally vous donnera l'autocomplétion dans les templates
 *
 * 2. Dans le code TypeScript:
 *    - Importez TranslationKey pour avoir le typage
 *    - Utilisez I18nService pour les traductions programmatiques
 *    - Le compilateur TypeScript détectera les clés invalides
 *
 * 3. Après modification des traductions:
 *    - Lancez: npm run generate:i18n-types
 *    - Cela mettra à jour l'autocomplétion
 *
 * 4. Avant de commit:
 *    - Lancez: npm run validate:i18n
 *    - Assurez-vous que tous les fichiers de langue sont cohérents
 */
