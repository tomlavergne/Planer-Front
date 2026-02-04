import type { Size, SemanticColor } from '../../../types';
import { Icon } from '../icon/icon.type';

export namespace SegmentedControl {
  export type Type = 'button' | 'submit' | 'reset';

  export interface Option {
    value: string;
    label: string;
    icon?: Icon.Name;
    disabled?: boolean;
  }

  export type Color = SemanticColor | null;
}
