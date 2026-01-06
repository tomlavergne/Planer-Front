import type {
  Size as UISize,
  Variant as UIVariant,
  Color as UIColor,
} from '../../../types/ui.types';

export namespace Toggle {
  export type Variant = Extract<UIVariant, 'solid' | 'soft'>;
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  export type Color = UIColor;
}
