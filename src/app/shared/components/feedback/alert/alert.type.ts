import type { SemanticColor, PrimaryColor } from '@shared/types/ui.types';
import type { Icon } from '@shared/components/misc/icon/icon.type';

export namespace Alert {
  export type Icon = Icon.Name;
  export interface Config {
    id: string;
    color?: SemanticColor | PrimaryColor;
    title?: string;
    message: string;
    icon?: Icon.Name;
    duration?: number; // En millisecondes, 0 = infini
    action?: {
      label: string;
      callback: () => void;
    } | null;
    dismissible?: boolean;
  }
}
