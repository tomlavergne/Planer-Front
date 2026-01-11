import type { Size as UISize, Variant as UIVariant } from '../../../types/ui.types';

export namespace Accordion {
  export type Variant = Extract<UIVariant, 'soft' | 'ghost'>;
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}
