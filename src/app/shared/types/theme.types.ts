/**
 * Types liés au thème et aux préférences de l'application
 */

/***** Thème *****/
export type Theme = 'light' | 'dark' | 'system';

/***** Internationalisation *****/
export type Language = 'fr' | 'en';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
export type TimeFormat = '12h' | '24h';

/***** Couleurs du design system *****/
export namespace Color {
  // Couleurs principales
  export type Primary =
    | 'primary-50'
    | 'primary-100'
    | 'primary-200'
    | 'primary-300'
    | 'primary-400'
    | 'primary-500'
    | 'primary-600'
    | 'primary-700'
    | 'primary-800'
    | 'primary-900';

  // Couleurs sémantiques
  export type Semantic = 'success' | 'warning' | 'danger' | 'info';

  // Couleurs neutres
  export type Neutral =
    | 'gray-50'
    | 'gray-100'
    | 'gray-200'
    | 'gray-300'
    | 'gray-400'
    | 'gray-500'
    | 'gray-600'
    | 'gray-700'
    | 'gray-800'
    | 'gray-900';

  // Toutes les couleurs
  export type All = Primary | Semantic | Neutral;
}

/***** Espacements *****/
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64;

/***** Border radius *****/
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/***** Shadow *****/
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/***** Breakpoints responsive *****/
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
