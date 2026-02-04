import { InputOptions } from '@angular/core';

export namespace Documentation {
  /***************/
  /***** API *****/
  /***************/

  /**
   * Configuration de base pour toute propriété de composant
   */
  interface APIConfig {
    /** Nom de la propriété */
    name: string;
    /** Type TypeScript (pour la documentation) */
    type: string | string[] | null;
    /** Description */
    description: string;
  }

  /**
   * Configuration pour un input Angular
   */
  export interface InputConfig<T = any> extends APIConfig {
    /** Valeur par défaut */
    default: T;
    /** Est-ce un champ requis ? */
    required?: boolean;
    /** Options Angular pour l'input (transform, alias...) */
    options?: InputOptions<T, any>;
  }

  /**
   * Configuration pour un model Angular
   */
  export interface ModelConfig<T = any> extends APIConfig {
    /** Valeur par défaut */
    default: T;
  }

  /**
   * Configuration pour un output Angular
   */
  export interface OutputConfig<T = any> extends APIConfig {
    /** Alias optionnel */
    alias?: string;
  }
}
