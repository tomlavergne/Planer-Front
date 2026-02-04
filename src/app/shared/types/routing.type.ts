/***** Import de types *****/
import type { Icon } from '@shared/components/display/icon/icon.type';

export namespace Routing {
  /**********************/
  /***** NAVIGATION *****/
  /**********************/

  /**
   * Item de documentation (composant, directive, pipe, etc.)
   */
  export interface Item {
    /** Nom de l'item */
    name: string;
    /** Icon */
    icon?: Icon.Name;
    /** Chemin de l'item */
    path: string;
    /** Chemin d'importation de l'item */
    importPath: string;
    /** Fonction de chargement dynamique du composant */
    loadComponent: () => Promise<any>;

    content?: Item[]; // Pour les items qui contiennent d'autres items (ex: sections sans page propre)
  }

  /**
   * Index de documentation (regroupe plusieurs sections)
   */
  export type Index = Item[];
}
