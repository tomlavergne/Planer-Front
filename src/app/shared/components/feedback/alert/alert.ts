/***** Imports de Angular *****/
import { booleanAttribute, Component, computed, input, output } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Button } from '../../forms/button/button';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import type {
  Alert as AlertType,
  Button as ButtonType,
  Color,
  LucideIconName,
  Position,
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
  variant = input<AlertType.Variant>('solid');
  color = input<Color | null>(null);
  icon = input<LucideIconName | null>(null);
  title = input<string | null>(null);
  message = input<string | null>(null);
  button = input<{
    text: string;
    icon?: {
      name: LucideIconName;
      position?: Position;
    } | null;
    callback: () => void;
  } | null>(null);
  borderRadius = input<ButtonType.BorderRadius>('md');
  dismissible = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Outputs *****/
  dismissed = output<void>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      this.color() ? `color-${this.color()}` : '',
      `border-radius-${this.borderRadius()}`,
    ].join(' ');
  });

  // Computed pour l'icône par défaut selon la variante
  //   defaultIcon = computed((): LucideIconName => {
  //     const iconMap: Record<SemanticVariant, LucideIconName> = {
  //       info: 'lucideInfo',
  //       success: 'lucideCircleCheck',
  //       warning: 'lucideShieldAlert',
  //       danger: 'lucideOctagonAlert',
  //       default: 'lucideInfo',
  //     };
  //     return iconMap[this.variant()];
  //   });

  //   Computed pour la couleur par défaut selon la variante
  contentColor = computed((): Color => {
    if (this.variant() === 'solid') {
      return 'white';
    } else {
      return this.color() || 'blue';
    }
  });

  // Computed pour le variant du bouton (inverse de l'alerte)
  buttonVariant = computed((): ButtonType.Variant => {
    if (this.variant() === 'solid') {
      return 'solid';
    } else {
      return 'ghost';
    }
  });

  onDismiss(): void {
    this.dismissed.emit();
  }
}
