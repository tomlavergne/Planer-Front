/**
 * Index central pour tous les types de l'application
 * Permet des imports simplifiés depuis n'importe où dans l'app
 */

// Types UI de base
export * from './ui.types';

// Types spécifiques aux composants
export * from './component.types';

// Types de thème
export * from './theme.types';

// Types de données métier
export * from './data.types';

/**
 * Exemples d'utilisation :
 *
 * // Import depuis le barrel
 * import { Button, Size, ColorVariant } from '@shared/types';
 *
 * // Import depuis un fichier spécifique
 * import { Button } from '@shared/types/component.types';
 * import { ColorVariant } from '@shared/types/ui.types';
 */
