import { Input as InputType } from './input.type';

/**
 * Filtre par défaut pour les nombres positifs uniquement
 */
export const numberFilter = (value: string): string => value.replace(/[^0-9]/g, '');

/**
 * Filtre pour les nombres (positifs et négatifs)
 */
export const integerFilter = (value: string): string => value.replace(/[^0-9-]/g, '');
