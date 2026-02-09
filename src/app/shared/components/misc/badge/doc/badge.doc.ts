import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Badge, Card, Text } from '../../..';
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Preview } from '@features/documentation/children/preview/preview';

// Import de types
import { Badge as BadgeType } from '../badge.type';

@Component({
  selector: 'app-badge-doc',
  imports: [Flex, Badge, DocumentationTemplate, Preview, Card, Text],
  templateUrl: './badge.doc.html',
})
export class BadgeDoc {
  primaryColors: BadgeType.Color[] = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'neutral',
  ];

  semanticColors: BadgeType.Color[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];
  variants: BadgeType.Variant[] = ['solid', 'soft', 'outline'];
  sizes: BadgeType.Size[] = ['xs', 'sm', 'md', 'lg'];
}
