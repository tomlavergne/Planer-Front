import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Badge, Text } from '../../../../../../shared/components';

// Import de types
import { Badge as BadgeType } from '../../../../../../shared/components/display/badge/badge.type';

@Component({
  selector: 'app-badge-documentation',
  imports: [Flex, Badge, Text],
  templateUrl: './badge-documentation.html',
  styleUrl: './badge-documentation.scss',
})
export class BadgeDocumentation {
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
