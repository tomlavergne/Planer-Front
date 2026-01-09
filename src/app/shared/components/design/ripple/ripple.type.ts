import type { Color as ColorType } from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Ripple {
  export type Color = ColorType;
  export type Circle = {
    x: number;
    y: number;
    size: number;
  };
}
