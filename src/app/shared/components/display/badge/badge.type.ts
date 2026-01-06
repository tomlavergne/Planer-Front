import type {
  Size as UISize,
  Variant as UIVariant,
  Position,
  Color as UIColor,
} from '../../../types/ui.types';

export namespace Badge {
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline'>;
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg'>;
  export type IconPosition = Position;
  export type Color = UIColor;
}
