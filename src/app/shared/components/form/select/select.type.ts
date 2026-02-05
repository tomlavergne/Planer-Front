import type {} from '../../../types/ui.types';

/***** Composants de formulaire *****/
export namespace Select {
  export interface Option {
    value: string;
    label: string;
    disabled?: boolean;
  }
}
