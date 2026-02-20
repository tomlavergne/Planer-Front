/**
 * Interface stricte pour la structure des traductions
 * Tous les fichiers de langue DOIVENT implémenter cette interface
 *
 * TypeScript garantit automatiquement la cohérence !
 */
export interface TranslationSchema {
  common: {
    back: string;
  };
  auth: {
    login: {
      title: string;
      email: string;
      emailPlaceholder: string;
      submit: string;
      or: string;
      otherMethods: string;
    };
    otp: {
      title: string;
      description: string;
      submit: string;
      sendAgainIn: string;
      resend: string;
    };
  };
  settings: {
    general: {
      label: string;
      preferences: {
        label: string;
        description: string;
        general: {
          label: string;
          language: {
            label: string;
            description: string;
          };
        };
        appearance: {
          label: string;
          theme: {
            label: string;
            description: string;
            options: {
              light: string;
              dark: string;
              auto: string;
            };
          };
          primaryColor: {
            label: string;
            description: string;
            options: {
              red: string;
              orange: string;
              yellow: string;
              lime: string;
              green: string;
              emerald: string;
              teal: string;
              cyan: string;
              sky: string;
              blue: string;
              indigo: string;
              violet: string;
              fuchsia: string;
              pink: string;
              neutral: string;
            };
          };
        };
      };
    };
  };
}

/**
 * Type utilitaire récursif pour extraire tous les chemins possibles d'un objet
 * Génère automatiquement toutes les clés de traduction depuis TranslationSchema
 *
 * Exemples générés :
 * - 'common.back'
 * - 'auth.login.title'
 * - 'settings.general.preferences.appearance.theme.label'
 */
type Paths<T, Prefix extends string = ''> = T extends string | number | boolean
  ? Prefix extends ''
    ? never
    : Prefix
  : {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? Paths<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K}`>
          : `${Prefix}${Prefix extends '' ? '' : '.'}${K}`
        : never;
    }[keyof T];

/**
 * Union de toutes les clés de traduction possibles
 * Généré AUTOMATIQUEMENT depuis TranslationSchema
 *
 * ✅ Source unique de vérité : TranslationSchema
 * ✅ Pas de duplication manuelle
 * ✅ Autocomplétion garantie
 */
export type TranslationKey = Paths<TranslationSchema>;

/**
 * Langues disponibles
 */
export type AvailableLocale = 'fr' | 'en';
