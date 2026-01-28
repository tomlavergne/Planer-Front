import * as lucideIcons from '@ng-icons/lucide';
import * as phosphorIcons from '@ng-icons/phosphor-icons/regular';

import type { Size as UISize } from '../../../types/ui.types';
import type { Text } from '../text/text.type';

export namespace Icon {
  export type Name = keyof typeof lucideIcons | keyof typeof phosphorIcons;
  export type Size = Extract<UISize, '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
  export type StrokeWidth = 1 | 2 | 3 | 4 | 5 | 6;
  export type Color = Text.Color;
}
