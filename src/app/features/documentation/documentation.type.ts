import { InputOptions } from '@angular/core';

export namespace Documentation {
  /**********************/
  /***** NAVIGATION *****/
  /**********************/

  /**
   * Item de documentation (composant, directive, pipe, etc.)
   */
  export interface Item {
    /** Nom de l'item */
    name: string;
    /** Chemin d'accès à l'item */
    path: string;
    /** Chemin d'importation de l'item */
    importPath: string;
    /** Fonction de chargement dynamique du composant */
    loadComponent: () => Promise<any>;
  }

  /**
   * Section de documentation (regroupe plusieurs items)
   */
  export interface Section extends Item {
    /** Contenu de la section */
    content: Item[];
  }

  /**
   * Index de documentation (regroupe plusieurs sections)
   */
  export type Index = Section[];

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
