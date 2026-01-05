/**
 * Types de base pour les composants UI
 * Ces types sont partagés entre plusieurs composants
 */

/***** Tailles *****/
export type Size =
  | '6xs'
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';
export type IconSize = '16' | '20' | '24' | '32';

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

/***** Couleurs *****/
export type Color =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'white'
  | 'gray'
  | 'black';

/***** Variantes de couleur *****/
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
