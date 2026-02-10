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
          },
          primaryColor: {
            label: 'Couleur principale',
            description: "Sélectionnez la couleur principale de l'application.",
          },
        },
      },
    },
  },
};
