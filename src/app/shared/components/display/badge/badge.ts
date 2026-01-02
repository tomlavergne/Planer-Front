/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../text/text';
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import type { LucideIconName, Size } from '../../../types/';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

@Component({
  selector: 'app-badge',
  imports: [Flex, Text, Icon],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Badge {
  /***** Inputs *****/
  text = input<string>('');
  icon = input<LucideIconName | null>(null);
  variant = input<BadgeVariant>('default');
  size = input<Size>('md');

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`variant-${this.variant()}`, `size-${this.size()}`].join(' ');
  });
}
