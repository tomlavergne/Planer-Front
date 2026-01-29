/***** Imports de Angular *****/
import { Component, computed, input, output } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../../display/icon/icon';
import { Text } from '../../../display/text/text';
import { Button } from '../../../form/button/button';
import { Flex } from '../../../layout/flex/flex';

/***** Imports de types *****/
import type { Toast as ToastType } from './toast.type';

@Component({
  selector: 'app-toast',
  imports: [Flex, Text, Icon, Button],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Toast {
  /******************/
  /***** Inputs *****/
  /******************/

  color = input.required<ToastType.Color>();
  title = input<string | null>(null);
  message = input.required<string>();
  icon = input<ToastType.Config['icon']>(undefined);
  dismissible = input<boolean>(true);
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

  defaultIcon = computed<ToastType.Config['icon']>(() => {
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
