import type { Size as UISize } from '../../../types/ui.types';

export namespace Slider {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
  export type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
}
