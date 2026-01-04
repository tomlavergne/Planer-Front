/**
 * Types liés au thème et aux préférences de l'application
 */

/***** Thème *****/
export type Theme = 'light' | 'dark' | 'system';

/***** Internationalisation *****/
export type Language = 'fr' | 'en';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
export type TimeFormat = '12h' | '24h';

/***** Espacements *****/
export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64;

/***** Border radius *****/
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/***** Shadow *****/
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/***** Breakpoints responsive *****/
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
