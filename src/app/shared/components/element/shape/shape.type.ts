import type { Size as UISize, PrimaryColor, SemanticColor } from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Shape {
  export type Type = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'star';
  export type Size = Extract<UISize, '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
  export type Color = PrimaryColor | SemanticColor;
}
