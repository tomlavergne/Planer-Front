/**
 * Types de base pour les composants UI
 * Ces types sont partagés entre plusieurs composants
 */

/***** Tailles *****/
export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type IconSize = '16' | '20' | '24' | '32';

/***** Variantes de couleur *****/
export type ColorVariant =
  | 'primary' // Bleu principal
  | 'secondary' // Gris secondaire
  | 'success' // Vert pour succès
  | 'warning' // Orange pour avertissement
  | 'danger' // Rouge pour danger
  | 'disabled' // Gris clair pour éléments désactivés
  | 'inverse' // Couleur inverse (ex. blanc sur fond sombre)
  | 'white'; // Blanc pur
export type SemanticVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

/***** Apparences visuelles *****/
export type Appearance = 'filled' | 'outline' | 'ghost' | 'link';

/***** Positions *****/
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type AdvancedPosition =
  | Position
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

export type Orientation = 'horizontal' | 'vertical';

/***** Alignements *****/
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/***** Typographie *****/
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

/***** États *****/
export type InputState = 'default' | 'focus' | 'error' | 'disabled' | 'readonly';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
