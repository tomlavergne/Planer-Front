import type { Size as UISize, Variant as UIVariant } from '../../../types/ui.types';
import { Icon } from '@shared/components/misc/icon/icon.type';

export namespace Input {
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
  export type Variant = 'solid' | 'soft' | 'outline';
  export type Value = string | number;
  export type Action = {
    label?: string;
    icon?: Icon.Name;
    disabled?: boolean;
    tooltip?: string;
    callback: () => void;
  };
  export type FilterFn = (value: string) => string;
  export type ValidatorFn = (value: any) => string | null;
}
