import type {
  Variant as UIVariant,
  Position as UIPosition,
  Size as UISize,
  PrimaryColor,
  SemanticColor,
} from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Button {
  export type Type = 'button' | 'submit' | 'reset';
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline' | 'ghost'>;
  export type Size = Extract<UISize, '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type IconPosition = UIPosition;
  export type BorderRadius = Extract<UISize, 'none' | 'sm' | 'md' | 'lg' | 'full'>;
  export type Color = PrimaryColor | SemanticColor;
}
