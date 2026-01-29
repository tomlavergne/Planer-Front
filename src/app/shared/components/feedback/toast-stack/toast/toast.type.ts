import type { SemanticColor, PrimaryColor } from '../../../../types/ui.types';

import type { Icon } from '../../../display/icon/icon.type';

export namespace Toast {
  export type Color = SemanticColor | PrimaryColor;
  export type Icon = Icon.Name;
  export interface Config {
    id: string;
    color?: Color;
    title?: string;
    message: string;
    icon?: Icon.Name;
    duration?: number; // En millisecondes, 0 = infini
    dismissible?: boolean;
  }
}
