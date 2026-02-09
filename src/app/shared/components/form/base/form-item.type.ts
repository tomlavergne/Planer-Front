import type { Size as UISize, Variant as UIVariant } from '../../../types/ui.types';

export namespace FormItem {
  /**
   * Tailles disponibles pour les éléments de formulaire
   */
  export type Size = Extract<UISize, 'sm' | 'md' | 'lg'>;

  /**
   * Variants visuels pour les éléments de formulaire
   */
  export type Variant = 'solid' | 'soft' | 'outline';

  /**
   * Type de valeur générique pour un contrôle de formulaire
   */
  export type Value = string | number | boolean | null | undefined;

  /**
   * Fonction de validation qui retourne un message d'erreur ou null si valide
   */
  export type ValidatorFn<T = any> = (value: T) => string | null;

  /**
   * Fonction de filtre pour transformer la valeur entrée
   */
  export type FilterFn = (value: string) => string;

  /**
   * État d'un contrôle de formulaire
   */
  export interface ControlState {
    /** Le contrôle a été visité (focus puis blur) */
    isTouched: boolean;
    /** Le contrôle a actuellement le focus */
    isFocused: boolean;
    /** La valeur a été modifiée depuis l'initialisation */
    isDirty: boolean;
    /** Le contrôle est valide (pas d'erreurs) */
    isValid: boolean;
    /** Message d'erreur actuel (null si valide) */
    errorMessage: string | null;
  }
}
