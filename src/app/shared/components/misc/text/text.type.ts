import type {
  Size as UISize,
  PrimaryColor,
  SemanticColor,
  TextColor,
  FontWeight,
} from '@shared/types/ui.types';

export namespace Text {
  export type Variant = 'body' | 'heading' | 'caption' | 'label';
  export type Size = Extract<
    UISize,
    '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  >;
  export type Color = PrimaryColor | SemanticColor | TextColor;
  export type Weight = FontWeight;
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
  export type LineHeight = 'normal' | 'none' | 'short' | 'base' | 'tall';
}
