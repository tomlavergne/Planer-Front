import type { Size as UISize } from '../../../types/ui.types';

export namespace Grid {
  export type Display = 'grid' | 'inline-grid' | 'none';
  export type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  export type JustifyItems = 'start' | 'center' | 'end' | 'stretch';
  export type AlignContent =
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'between'
    | 'around'
    | 'evenly';
  export type JustifyContent =
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'between'
    | 'around'
    | 'evenly';
  export type Gap =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
  export type RowGap =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
  export type ColumnGap =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
  export type Padding =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
    | 'none';
  export type AutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense';
}
