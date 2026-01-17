import type { Size as UISize, Variant as UIVariant } from '../../../types/ui.types';

export namespace Input {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
  export type Variant = 'default' | 'filled' | 'outline';
  export type Type = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}
