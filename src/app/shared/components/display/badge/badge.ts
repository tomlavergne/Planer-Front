/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../text/text';
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import { Size, LucideIconName, Position, ColorVariant } from '../../../types';

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
  variant = input<BadgeVariant>('default');
  icon = input<{
    name: LucideIconName;
    position?: Position;
  } | null>(null);

  size = input<Size>('md');

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`variant-${this.variant()}`, `size-${this.size()}`].join(' ');
  });

  // Computed pour la couleur du contenu (icone + texte)
  contentColor = computed((): ColorVariant => {
    if (['primary', 'success', 'warning', 'danger'].includes(this.variant())) {
      return 'white';
    } else {
      return 'secondary';
    }
  });
}
