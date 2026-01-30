/***** Imports de Angular *****/
import { Component, inject, signal } from '@angular/core';

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
  host: {
    '[class.is-hovered]': 'isHovered()',
  },
})
export class ToastStack {
  toastService = inject(ToastService);

  // Signal pour tracker l'état hover
  isHovered = signal(false);

  /**
   * Active l'état hover
   */
  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  /**
   * Désactive l'état hover
   */
  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  /**
   * Supprime un toast
   */
  onDismiss(id: string): void {
    this.toastService.remove(id);
  }
}
