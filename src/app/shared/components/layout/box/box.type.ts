import type {
  Size as UISize,
  SemanticColor,
  PrimaryColor,
  BackgroundColor,
} from '../../../types/ui.types';

export namespace Box {
  export type Color = SemanticColor | PrimaryColor | BackgroundColor;
  export type Padding =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
  export type Margin =
    | Extract<UISize, '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>
    | 'none';
}
