/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../text/text';
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import type { Badge as BadgeType } from './badge.type';
import type { Icon as IconType } from '../icon/icon.type';

/***** Import de configuration *****/
import { BADGE_SIZES_CONFIG } from './badge.config';

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
  /******************/
  /***** Inputs *****/
  /******************/

  text = input<string>('');
  variant = input<BadgeType.Variant>('solid');
  color = input<BadgeType.Color | null>('blue');
  icon = input<{
    name: IconType.Name;
    position?: BadgeType.IconPosition;
  } | null>(null);

  size = input<BadgeType.Size>('md');

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour les classes
  hostClasses = computed(() => {
    const classes = [`variant-${this.variant()}`, `size-${this.size()}`];
    if (this.color()) {
      classes.push(`color-${this.color()}`);
    }
    return classes.join(' ');
  });

  // Computed pour la couleur du contenu (icone + texte)
  contentColor = computed((): BadgeType.Color => {
    if (this.variant() === 'solid') {
      return 'white';
    } else {
      return this.color() || 'blue';
    }
  });

  // Computed pour la configuration actuelle selon la taille
  currentConfig = computed(() => BADGE_SIZES_CONFIG[this.size()]);

  gapSize = computed((): BadgeType.Size => {
    if (this.size() === 'xs' || this.size() === 'sm') {
      return 'xs';
    } else {
      return 'sm';
    }
  });
}
