import { TranslationSchema } from '../../app/core/i18n/translation-schema.type';

/**
 * Traductions anglaises
 *
 * TypeScript GARANTIT que cette structure est IDENTIQUE à fr.ts
 * Si une clé manque ou est en trop, vous aurez une ERREUR DE COMPILATION ✅
 */
export const enTranslations: TranslationSchema = {
  common: {
    back: 'Back',
  },
  auth: {
    login: {
      title: 'Sign in',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      submit: 'Continue',
      or: 'or',
      otherMethods: 'See other sign in methods',
    },
  },
  settings: {
    general: {
      label: 'General',
      preferences: {
        label: 'Preferences',
        description: 'Customize your experience by adjusting language and theme settings.',
        general: {
          label: 'General',
          language: {
            label: 'Language',
            description: 'Select the interface language for the application.',
          },
        },
        appearance: {
          label: 'Appearance',
          theme: {
            label: 'Theme',
            description:
              'Choose between light, dark or automatic theme that adapts to your system.',
          },
          primaryColor: {
            label: 'Primary color',
            description: 'Select the primary color of the application.',
          },
        },
      },
    },
  },
};
