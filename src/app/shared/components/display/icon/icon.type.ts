import * as lucideIcons from '@ng-icons/lucide';
import type { Size as UISize, Color as UIColor } from '../../../types/ui.types';

export namespace Icon {
  export type Name = keyof typeof lucideIcons;
  export type Size = Extract<UISize, '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
  export type Color = UIColor;
}

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
