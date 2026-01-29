/***** Imports de Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports de composants *****/
import { Toast } from './toast/toast';
import { Flex } from '@shared/components/layout/flex/flex';

/***** Imports de services *****/
import { ToastService } from './toast-stack.service';

@Component({
  selector: 'app-toast-stack',
  imports: [Toast, Flex],
  templateUrl: './toast-stack.html',
  styleUrl: './toast-stack.scss',
})
export class ToastStack {
  toastService = inject(ToastService);

  /**
   * Supprime un toast
   */
  onDismiss(id: string): void {
    this.toastService.remove(id);
  }
}
