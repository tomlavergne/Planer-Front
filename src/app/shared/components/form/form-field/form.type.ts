import { Size as UISize } from '@shared/types/ui.types';

export namespace FormField {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}
