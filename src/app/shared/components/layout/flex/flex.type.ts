import type { Size as UISize } from '../../../types/ui.types';

export namespace Flex {
  export type Display = 'flex' | 'inline-flex' | 'none';
  export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
  export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
  export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  export type Gap =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
  export type Padding =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
}
