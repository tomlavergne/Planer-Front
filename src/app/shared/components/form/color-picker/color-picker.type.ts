import type { Size as UISize } from '../../../types/ui.types';

export namespace ColorPicker {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
  export type Variant = 'default' | 'filled' | 'outline';
  export type Format = 'hex' | 'rgb' | 'hsl';
}
