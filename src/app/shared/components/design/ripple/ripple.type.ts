import type { PrimaryColor } from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Ripple {
  export type Color = PrimaryColor;
  export type Circle = {
    x: number;
    y: number;
    size: number;
  };
}
