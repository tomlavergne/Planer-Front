/**
 * Types spécifiques aux composants
 * Organisés par namespace pour éviter les conflits
 */

import { Accordion } from '../components';
import type {
  Color,
  Variant as UIVariant,
  Position as UIPosition,
  AdvancedPosition,
  Size as UISize,
} from './ui.types';

/***** Composants de formulaire *****/
export namespace Button {
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
  export type IconPosition = UIPosition;
  export type Type = 'button' | 'submit' | 'reset';
  export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export namespace Input {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
  export type Variant = 'default' | 'filled' | 'outline';
  export type Type = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}

export namespace Select {
  export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: string;
  }
}

export namespace Checkbox {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}

export namespace RadioGroup {
  export type Orientation = 'horizontal' | 'vertical';
}

export namespace Switch {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}

/***** Composants d'affichage *****/
export namespace Text {
  export type Variant = 'body' | 'heading' | 'caption' | 'label';
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  export type Weight = 'normal' | 'medium' | 'semibold' | 'bold';
  export type Align = 'left' | 'center' | 'right' | 'justify';
  export type As =
    | 'p'
    | 'span'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'small';
}

export namespace Accordion {
  export type Variant = Extract<UIVariant, 'soft' | 'ghost'>;
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
}

export namespace Badge {
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg'>;
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline'>;
}

export namespace Avatar {
  export type Size = UISize | 'xl' | '2xl';
  export type Shape = 'circle' | 'rounded' | 'square';
}

export namespace Icon {
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
}

export namespace Separator {
  export type Orientation = 'horizontal' | 'vertical';
}

/***** Composants de feedback *****/
export namespace Alert {
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline'>;
}

export namespace Progress {
  export type Variant = UIVariant;
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}

export namespace Skeleton {
  export type Variant = 'text' | 'circular' | 'rectangular' | 'rounded';
}

/***** Composants de navigation *****/
export namespace Tabs {
  export type Orientation = 'horizontal' | 'vertical';
  export type Variant = 'default' | 'pills' | 'underline';
}

/***** Composants overlay *****/
export namespace Popover {
  export type Position = AdvancedPosition;
  export type Trigger = 'click' | 'hover' | 'manual';
}

export namespace Tooltip {
  export type Position = UIPosition;
}

export namespace Dialog {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'> | 'xl' | 'full';
}

export namespace ContextMenu {
  export interface Item {
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    separator?: boolean;
    children?: Item[];
  }
}

/***** Composants de layout *****/
export namespace Flex {
  export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
  export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
  export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  export type Gap = Extract<UISize, '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'> | 'none';
  export type Padding = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> | 'none';
}

export namespace Spacer {
  export type Size = UISize | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  export type Orientation = 'horizontal' | 'vertical';
}
