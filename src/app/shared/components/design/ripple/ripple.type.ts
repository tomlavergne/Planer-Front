import type { PrimaryColor, NeutralColor } from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Ripple {
  export type Color = PrimaryColor | NeutralColor;
  export type Circle = {
    x: number;
    y: number;
    size: number;
  };
}
