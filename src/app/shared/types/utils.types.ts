import { InputOptions } from '@angular/core';

/***** Types pour les métadonnées de composants (Utilisés dans la doc) *****/

/***** Types pour les métadonnées de composants (Utilisés dans la doc) *****/

/**
 * Configuration pour un input Angular
 */
export interface InputConfig<T = any> {
  /** Nom de l'input */
  name: string;
  /** Valeur par défaut */
  default: T;
  /** Type TypeScript (pour la documentation) */
  type: string;
  /** Description */
  description: string;
  /** Est-ce un champ requis ? */
  required?: boolean;
  /** Options Angular pour l'input (transform, alias...) */
  options?: InputOptions<T, any>;
}

export interface ModelConfig<T = any> {
  /** Nom du model */
  name: string;
  /** Valeur par défaut */
  default: T;
  /** Type TypeScript (pour la documentation) */
  type: string;
  /** Description */
  description: string;
}

/**
 * Configuration pour un output Angular
 */
export interface OutputConfig<T = any> {
  /** Nom de l'output */
  name: string;
  /** Type TypeScript en string (pour la documentation) */
  type: string;
  /** Description */
  description: string;
  /** Alias optionnel */
  alias?: string;
}
