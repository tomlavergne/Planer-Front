import type {
  Size as UISize,
  PrimaryColor,
  SemanticColor,
  TextColor,
  FontWeight,
} from '@shared/types/ui.types';

export namespace Logo {
  export type Size = Extract<UISize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
}
