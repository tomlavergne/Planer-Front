import type { Variant as UIVariant, PrimaryColor, SemanticColor } from '../../../types/ui.types';
import type { Icon } from '../../display/icon/icon.type';

export namespace Alert {
  export type Variant = Extract<UIVariant, 'solid' | 'soft' | 'outline'>;
  export type Color = PrimaryColor | SemanticColor;
  export type IconColor = Icon.Color;
}
