import type { Size as UISize, SemanticColor } from '../../../types';
import { Icon } from '../icon/icon.type';

export namespace SegmentedControl {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg' | 'xl'>;

  export interface Option {
    value: string;
    label?: string;
    icon?: Icon.Name;
    disabled?: boolean;
  }

  export type Color = SemanticColor | null;
}
