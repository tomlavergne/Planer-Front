import type { Variant as UIVariant, Color as UIColor } from '../../../types/ui.types';
import type { Icon } from '../../display/icon/icon.type';

export namespace Alert {
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline'>;
  export type Color = UIColor;
  export type IconColor = Icon.Color;
}
