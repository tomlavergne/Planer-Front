/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../text/text';
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import {
  Badge as BadgeType,
  LucideIconName,
  Position,
  Color,
  Icon as IconType,
} from '../../../types';

type BadgeVariant = 'solid' | 'soft' | 'outline';

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
  variant = input<BadgeVariant>('solid');
  color = input<Color | null>('blue');
  icon = input<{
    name: LucideIconName;
    position?: Position;
  } | null>(null);

  size = input<BadgeType.Size>('md');

  // Computed pour les classes
  hostClasses = computed(() => {
    const classes = [`variant-${this.variant()}`, `size-${this.size()}`];
    if (this.color()) {
      classes.push(`color-${this.color()}`);
    }
    return classes.join(' ');
  });

  // Computed pour la couleur du contenu (icone + texte)
  contentColor = computed((): Color => {
    if (this.variant() === 'solid') {
      return 'white';
    } else {
      return this.color() || 'blue';
    }
  });

  gapSize = computed((): BadgeType.Size => {
    if (this.size() === 'xs' || this.size() === 'sm') {
      return 'xs';
    } else {
      return 'sm';
    }
  });
}
