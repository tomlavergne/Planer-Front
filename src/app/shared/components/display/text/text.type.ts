import type { Size as UISize, Color as ColorType } from '../../../types/ui.types';

export namespace Text {
  export type Variant = 'body' | 'heading' | 'caption' | 'label';
  export type Size = Extract<
    UISize,
    '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  >;
  export type Color = ColorType | 'primary' | 'secondary' | 'primary-inverse' | 'secondary-inverse';
  export type Weight = 'thin' | 'regular' | 'medium' | 'semibold' | 'bold';
  export type Align = 'left' | 'center' | 'right' | 'justify';
  export type Decoration = 'none' | 'underline' | 'line-through' | 'overline';
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
