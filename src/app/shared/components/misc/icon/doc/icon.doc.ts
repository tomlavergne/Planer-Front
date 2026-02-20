/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Grid, Text, Icon, Button, Card } from '../../..';
import { Preview } from '@features/documentation/children/preview/preview';

/***** Import de drirectives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Documentation as DocumentationType } from '../../../../../features/documentation/documentation.type';
import { Icon as IconType } from '../icon.type';

/***** Imports des icônes *****/
import * as lucideIcons from '@ng-icons/lucide';
import * as phosphorIcons from '@ng-icons/phosphor-icons';

/***** Import de variables *****/
import { semanticColors, primaryColors } from '@shared/variables/colors';

/***** Imports de services *****/
import { ToastService } from '@shared/components/feedback/toast-stack/toast-stack.service';

@Component({
  selector: 'app-icon-doc',
  imports: [DocumentationTemplate, Flex, Grid, Text, Icon, Button, Card, Preview, TooltipDirective],
  templateUrl: './icon.doc.html',
})
export class IconDoc {
  toastService = inject(ToastService);

  readonly lucideIconsName = Object.keys(lucideIcons) as Array<keyof typeof lucideIcons>;
  //   readonly phosphorIconsName = Object.keys(phosphorIcons) as Array<keyof typeof phosphorIcons>;

  copyIconName(iconName: string): void {
    navigator.clipboard.writeText(iconName);
    console.log(iconName);
    this.toastService.success(
      `L'icone nommée "${iconName}" a été copié dans le presse papier`,
      'Icon Name Copied',
    );
  }

  semanticColors: IconType.Color[] = semanticColors;
  primaryColors: IconType.Color[] = primaryColors;

  sizes: IconType.Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  strokeWidths: IconType.StrokeWidth[] = [1, 2, 3, 4, 5];

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'IconType.Name',
      default: null as IconType.Name | null,
      type: 'string | null',
      description: 'Texte affiché dans le bouton',
    },
    {
      name: 'IconType.Size',
      default: 'md' as IconType.Size,
      type: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: "Taille de l'icône",
    },
    {
      name: 'strokeWidth',
      default: 2,
      type: 'number',
      description: "Épaisseur du trait de l'icône",
    },
    {
      name: 'color',
      default: 'blue' as IconType.Color | 'text',
      type: 'Color | "primary"',
      description: "Couleur de l'icône",
    },
  ];
}
