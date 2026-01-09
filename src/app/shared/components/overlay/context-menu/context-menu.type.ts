import type { Size as UISize, Color as UIColor } from '../../../types/ui.types';
import type { Button as ButtonType } from '../../forms/button/button.type';
import type { Icon as IconType } from '../../display/icon/icon.type';

export namespace ContextMenu {
  export type Item = {
    label: string;
    icon?: IconType.Name;
    color?: IconType.Color;
    variant?: ButtonType.Variant;
    subItems?: Item[];
    disabled?: boolean;
    action?: () => void;
  };
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;
}
