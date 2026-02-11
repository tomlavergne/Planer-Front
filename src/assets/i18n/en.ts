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
    otp: {
      title: 'Verification code',
      description: 'A 6-digit code has been sent to email address :',
      submit: 'Verify',
      sendAgainIn: 'Resend in {{seconds}} second{{ sLetter }}',
      resend: 'Resend code',
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
            options: {
              light: 'Light',
              dark: 'Dark',
              auto: 'Auto',
            },
          },
          primaryColor: {
            label: 'Accent color',
            description: 'Select the accent color of the application.',
            options: {
              red: 'Red',
              orange: 'Orange',
              amber: 'Amber',
              yellow: 'Yellow',
              lime: 'Lime',
              green: 'Green',
              emerald: 'Emerald',
              teal: 'Teal',
              cyan: 'Cyan',
              sky: 'Sky',
              blue: 'Blue',
              indigo: 'Indigo',
              violet: 'Violet',
              purple: 'Purple',
              fuchsia: 'Fuchsia',
              pink: 'Pink',
              rose: 'Rose',
              neutral: 'Neutral',
            },
          },
        },
      },
    },
  },
};
