/***** Imports de Angular *****/
import { booleanAttribute, Component, computed, input, output } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Button } from '../../form/button/button';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import type { Alert as AlertType } from './alert.type';
import type { Icon as Toggle } from '../../display/icon/icon.type';
import type { Button as ButtonType } from '../../form/button/button.type';
import type { Text as textType } from '../../display/text/text.type';

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
  /******************/
  /***** Inputs *****/
  /******************/

  variant = input<AlertType.Variant>('solid');
  color = input<AlertType.Color | null>(null);
  icon = input<Toggle.Name | null>(null);
  title = input<string | null>(null);
  message = input<string | null>(null);
  button = input<{
    text: string;
    icon?: {
      name: Toggle.Name;
      position?: ButtonType.IconPosition;
    } | null;
    callback: () => void;
  } | null>(null);
  borderRadius = input<ButtonType.BorderRadius>('md');
  dismissible = input<boolean, any>(false, { transform: booleanAttribute });

  /*******************/
  /***** Outputs *****/
  /*******************/

  dismissed = output<void>();

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      this.color() ? `color-${this.color()}` : '',
      `border-radius-${this.borderRadius()}`,
    ].join(' ');
  });

  // Computed pour la couleur du contenu (icone + texte)
  contentColor = computed((): textType.Color => {
    if (this.variant() === 'solid') {
      return 'primary';
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

  /*******************/
  /***** Methods *****/
  /*******************/

  onDismiss(): void {
    this.dismissed.emit();
  }
}
