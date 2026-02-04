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

export type FontWeight = 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

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
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

/***** États *****/
export type InputState = 'default' | 'focus' | 'error' | 'disabled' | 'readonly';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/***** Theme *****/
export type Theme = 'light' | 'dark' | 'auto';

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
  | 'neutral';

export type SemanticColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

export type TextColor =
  | 'text-primary'
  | 'text-secondary'
  | 'text-tertiary'
  | 'text-inverse'
  | 'text-disabled';

export type BackgroundColor =
  | 'background-primary'
  | 'background-secondary'
  | 'background-tertiary'
  | 'background-inverse';

/***** Variants *****/
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
