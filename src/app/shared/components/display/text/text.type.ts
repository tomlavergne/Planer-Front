import type { Size as UISize, Color as ColorType } from '../../../types/ui.types';

export namespace Text {
  export type Variant = 'body' | 'heading' | 'caption' | 'label';
  export type Size = Extract<
    UISize,
    '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  >;
  export type Color = ColorType;
  export type Weight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
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
