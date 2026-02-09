/***** Imports de Angular *****/
import { booleanAttribute, Component, computed, input, output } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../misc/icon/icon';
import { Text } from '../../misc/text/text';
import { Button } from '../../form/button/button';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import type { Alert as AlertType } from './alert.type';
import type { Icon as Toggle } from '../../misc/icon/icon.type';
import type { Button as ButtonType } from '../../form/button/button.type';
import type { Text as textType } from '../../misc/text/text.type';

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

  color = input.required<AlertType.Config['color']>();
  title = input<string | null>(null);
  message = input.required<string>();
  icon = input<AlertType.Config['icon']>(undefined);
  action = input<AlertType.Config['action']>(null);
  dismissible = input<boolean, any>(false, { transform: booleanAttribute });
  isDismissing = input<boolean>(false);

  /*******************/
  /***** Outputs *****/
  /*******************/

  dismiss = output<void>();

  /*********************/
  /***** Computed *****/
  /*********************/

  hostClasses = computed(() => {
    const classes = [`color-${this.color()}`];
    if (this.isDismissing()) {
      classes.push('dismissing');
    }
    return classes.join(' ');
  });

  defaultIcon = computed<AlertType.Config['icon']>(() => {
    if (this.icon()) return this.icon();

    switch (this.color()) {
      case 'success':
        return 'lucideCheckCircle';
      case 'danger':
        return 'lucideXCircle';
      case 'warning':
        return 'lucideAlertTriangle';
      case 'info':
        return 'lucideInfo';
      default:
        return undefined;
    }
  });

  /*********************/
  /***** Methods *****/
  /*********************/

  onDismiss(): void {
    this.dismiss.emit();
  }
}
