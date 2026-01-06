/**
 * Types spécifiques aux composants
 * Organisés par namespace pour éviter les conflits
 */

import type {
  Variant as UIVariant,
  Position as UIPosition,
  AdvancedPosition,
  Size as UISize,
} from './ui.types';

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

/***** Composants d'affichage *****/

export namespace Avatar {
  export type Size = UISize | 'xl' | '2xl';
  export type Shape = 'circle' | 'rounded' | 'square';
}

export namespace Separator {
  export type Orientation = 'horizontal' | 'vertical';
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

export namespace Spacer {
  export type Size = UISize | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  export type Orientation = 'horizontal' | 'vertical';
}
