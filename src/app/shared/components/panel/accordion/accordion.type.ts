import type {
  Size as UISize,
  Variant as UIVariant,
  Color as UIColor,
} from '../../../types/ui.types';
import type { Text } from '../../display/text/text.type';

export namespace Accordion {
  export type Variant = Extract<UIVariant, 'soft' | 'ghost'>;
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg'>;
  export type Color = UIColor;
  export type TitleWeight = Text.Weight;
}
