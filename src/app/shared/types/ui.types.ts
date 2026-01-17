/**
 * Types de base pour les composants UI
 * Ces types sont partagés entre plusieurs composants
 */

/***** Tailles *****/
export type Size =
  | 'none'
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
  | '6xl'
  | 'full';
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

export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

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

export type PrimaryColor =
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'black';

export type NeutralColor = 'gray' | 'slate' | 'zinc' | 'neutral' | 'stone';

export type SemanticColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

// Nuances pour les textes et bordures
export type ForegroundShade =
  | 'foreground-primary'
  | 'foreground-secondary'
  | 'foreground-primary-inverse'
  | 'foreground-secondary-inverse';
export type BackgroundShade = 'background-primary' | 'background-secondary';
export type BorderShade = 'border';
export type Shade = ForegroundShade | BackgroundShade | BorderShade;

/***** Variants *****/
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
