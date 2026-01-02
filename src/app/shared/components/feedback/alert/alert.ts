/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../../display/text/text';
import { Button } from '../../forms/button/button';
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import type {
  LucideIconName,
  SemanticVariant,
  ColorVariant,
  Button as ButtonType,
} from '../../../types';

@Component({
  selector: 'app-alert',
  imports: [Flex, Text, Icon, Button],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'alert',
  },
})
export class Alert {
  /***** Inputs *****/
  variant = input<SemanticVariant>('info');
  title = input<string | null>(null);
  message = input<string | null>(null);
  button = input<{
    text: string;
    icon?: LucideIconName | null;
    callback: () => void;
  } | null>(null);
  dismissible = input<boolean, any>(false, { transform: booleanAttribute });
  showIcon = input<boolean, any>(true, { transform: booleanAttribute });

  /***** Outputs *****/
  dismissed = output<void>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`variant-${this.variant()}`].join(' ');
  });

  // Computed pour l'icône par défaut selon la variante
  defaultIcon = computed((): LucideIconName => {
    const iconMap: Record<SemanticVariant, LucideIconName> = {
      info: 'lucideInfo',
      success: 'lucideCircleCheck',
      warning: 'lucideShieldAlert',
      danger: 'lucideOctagonAlert',
      default: 'lucideInfo',
    };
    return iconMap[this.variant()];
  });

  // Computed pour la couleur par défaut selon la variante
  defaultColor = computed((): ColorVariant => {
    const colorMap: Record<SemanticVariant, ColorVariant> = {
      info: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      default: 'secondary',
    };
    return colorMap[this.variant()];
  });

  buttonVariant = computed((): void => {
    // const buttonVariantMap: Record<SemanticVariant, ButtonType.Variant> = {
    //   info: 'primary',
    //   success: 'success',
    //   warning: 'warning',
    //   danger: 'danger',
    //   default: 'secondary',
    // };
    // return buttonVariantMap[this.variant()];
  });

  onDismiss(): void {
    this.dismissed.emit();
  }
}
