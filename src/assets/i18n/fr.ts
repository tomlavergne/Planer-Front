import { TranslationSchema } from '../../app/core/i18n/translation-schema.type';

/**
 * Traductions françaises (langue de référence)
 *
 * TypeScript vérifie automatiquement que cette structure
 * correspond exactement à TranslationSchema
 */
export const frTranslations: TranslationSchema = {
  common: {
    back: 'Retour',
  },
  auth: {
    login: {
      title: 'Se connecter',
      email: 'Email',
      emailPlaceholder: 'Entrez votre email',
      submit: 'Continuer',
      or: 'ou',
      otherMethods: 'Voir les autres modes de connexion',
    },
    otp: {
      title: 'Code de vérification',
      description: "Un code à 6 chiffres a été envoyé à l'adresse :",
      submit: 'Vérifier',
      sendAgainIn: 'Renvoyer dans {{ seconds }} seconde{{ sLetter }}',
      resend: 'Renvoyer le code',
    },
  },
  settings: {
    general: {
      label: 'Général',
      preferences: {
        label: 'Préférences',
        description:
          'Personnalisez votre expérience en ajustant les paramètres de langue et de thème.',
        general: {
          label: 'Général',
          language: {
            label: 'Langue',
            description: "Sélectionnez la langue de l'interface de l'application.",
          },
        },
        appearance: {
          label: 'Apparence',
          theme: {
            label: 'Thème',
            description:
              "Choisissez entre le thème clair, sombre ou automatique qui s'adapte à votre système.",
            options: {
              light: 'Clair',
              dark: 'Sombre',
              auto: 'Auto',
            },
          },
          primaryColor: {
            label: "Couleur d'accentuation",
            description: "Sélectionnez la couleur d'accentuation de l'application.",
            options: {
              red: 'Rouge',
              orange: 'Orange',
              yellow: 'Jaune',
              lime: 'Citron vert',
              green: 'Vert',
              emerald: 'Émeraude',
              teal: 'Sarcelle',
              cyan: 'Cyan',
              sky: 'Bleu ciel',
              blue: 'Bleu',
              indigo: 'Indigo',
              violet: 'Violet',
              fuchsia: 'Fuchsia',
              pink: 'Rose',
              neutral: 'Neutre',
            },
          },
        },
      },
    },
  },
};
