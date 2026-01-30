/***** Imports de Angular *****/
import { Component, computed, input, output, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Icon, Text, Button, Flex } from '../../../';

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

  color = input.required<ToastType.Config['color']>();
  title = input<string | null>(null);
  message = input.required<string>();
  icon = input<ToastType.Config['icon']>(undefined);
  action = input<ToastType.Config['action']>(null);
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
