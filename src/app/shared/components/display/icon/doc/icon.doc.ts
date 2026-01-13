/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Grid, Text, Icon, Button } from '../../..';

/***** Import de drirectives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Imports des icônes *****/
import * as lucideIcons from '@ng-icons/lucide';

@Component({
  selector: 'app-icon-doc',
  imports: [DocumentationTemplate, Flex, Grid, Text, Icon, Button, TooltipDirective],
  templateUrl: './icon.doc.html',
})
export class IconDoc {
  readonly iconNames = Object.keys(lucideIcons) as Array<keyof typeof lucideIcons>;

  copyIconName(iconName: string): void {
    navigator.clipboard.writeText(iconName);
  }
}
