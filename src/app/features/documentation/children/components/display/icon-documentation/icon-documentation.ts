/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Grid, Text, Icon, Card, Button } from '../../../../../../shared/components';

/***** Imports des icônes *****/
import * as lucideIcons from '@ng-icons/lucide';

@Component({
  selector: 'app-icon-documentation',
  imports: [DocumentationTemplate, Flex, Grid, Text, Icon, Card, Button],
  templateUrl: './icon-documentation.html',
  styleUrl: './icon-documentation.scss',
})
export class IconDocumentation {
  readonly iconNames = Object.keys(lucideIcons) as Array<keyof typeof lucideIcons>;

  copyIconName(iconName: string): void {
    navigator.clipboard.writeText(iconName);
  }
}
