import * as lucideIcons from '@ng-icons/lucide';

export type LucideIconName = keyof typeof lucideIcons;

export type Size = 'xs' | 'sm' | 'md' | 'lg';

export type IconSize = '16' | '20' | '24' | '32';

export type Theme = 'light' | 'dark' | 'system';

export type Language = 'fr' | 'en';

export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';

export type TimeFormat = '12h' | '24h';

export type RelativePosition = 'top' | 'bottom' | 'left' | 'right';

export type AdvancedRelativePosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom';
