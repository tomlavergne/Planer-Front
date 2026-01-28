import type {
  Variant as UIVariant,
  Position as UIPosition,
  Size as UISize,
  SemanticColor,
} from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Button {
  export type Type = 'button' | 'submit' | 'reset';
  export type Variant = 'solid' | 'soft' | 'subtle' | 'outline' | 'ghost' | 'link';
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type IconPosition = UIPosition;
  export type BorderRadius = Extract<UISize, 'none' | 'sm' | 'md' | 'lg' | 'full'>;
  export type Color = SemanticColor;
}
