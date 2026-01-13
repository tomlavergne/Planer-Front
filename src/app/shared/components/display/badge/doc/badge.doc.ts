import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Badge, Text } from '../../..';
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';

// Import de types
import { Badge as BadgeType } from '../badge.type';

@Component({
  selector: 'app-badge-doc',
  imports: [Flex, Badge, Text, DocumentationTemplate],
  templateUrl: './badge.doc.html',
})
export class BadgeDoc {
  colors: BadgeType.Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];
  badgeVariants: BadgeType.Variant[] = ['solid', 'soft', 'outline'];
  badgeSizes: BadgeType.Size[] = ['xs', 'sm', 'md', 'lg'];
}
