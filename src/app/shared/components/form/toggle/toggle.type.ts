import type {
  Size as UISize,
  Variant as UIVariant,
  PrimaryColor,
  SemanticColor,
} from '../../../types/ui.types';

export namespace Toggle {
  export type Variant = Extract<UIVariant, 'solid' | 'soft'>;
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type Color = PrimaryColor | SemanticColor;
}
