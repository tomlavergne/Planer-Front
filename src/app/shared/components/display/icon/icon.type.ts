import * as lucideIcons from '@ng-icons/lucide';
import type { Size as UISize } from '../../../types/ui.types';
import type { Text } from '../text/text.type';

export namespace Icon {
  export type Name = keyof typeof lucideIcons;
  export type Size = Extract<UISize, '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
  export type Color = Text.Color;
}
