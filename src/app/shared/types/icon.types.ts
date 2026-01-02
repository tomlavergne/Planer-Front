/**
 * Types pour les icônes Lucide
 */

import * as lucideIcons from '@ng-icons/lucide';

export type LucideIconName = keyof typeof lucideIcons;

/**
 * Catégories d'icônes communes pour faciliter la recherche
 */
export namespace IconCategory {
  // Actions
  export type Action =
    | 'lucidePlus'
    | 'lucideMinus'
    | 'lucideEdit'
    | 'lucideTrash'
    | 'lucideSave'
    | 'lucideDownload'
    | 'lucideUpload'
    | 'lucideRefreshCw'
    | 'lucideCopy'
    | 'lucideCheck'
    | 'lucideX';

  // Navigation
  export type Navigation =
    | 'lucideChevronLeft'
    | 'lucideChevronRight'
    | 'lucideChevronUp'
    | 'lucideChevronDown'
    | 'lucideArrowLeft'
    | 'lucideArrowRight'
    | 'lucideArrowUp'
    | 'lucideArrowDown'
    | 'lucideMenu'
    | 'lucideMoreVertical'
    | 'lucideMoreHorizontal';

  // Interface
  export type Interface =
    | 'lucideHome'
    | 'lucideSettings'
    | 'lucideSearch'
    | 'lucideBell'
    | 'lucideUser'
    | 'lucideCalendar'
    | 'lucideFile'
    | 'lucideFolder'
    | 'lucideImage'
    | 'lucideEye'
    | 'lucideEyeOff';

  // État
  export type Status =
    | 'lucideCheckCircle'
    | 'lucideAlertCircle'
    | 'lucideAlertTriangle'
    | 'lucideInfo'
    | 'lucideHelpCircle'
    | 'lucideLoader';
}
