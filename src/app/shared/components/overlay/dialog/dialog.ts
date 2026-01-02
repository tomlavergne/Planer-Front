/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  signal,
  HostListener,
  booleanAttribute,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import { Size } from '../../../types/';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, Icon],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Dialog {
  /***** Inputs *****/
  title = input<string | null>(null);
  size = input<Size>('md');
  closeOnBackdrop = input<boolean, any>(true, { transform: booleanAttribute });
  showCloseButton = input<boolean, any>(true, { transform: booleanAttribute });

  /***** Model (two-way binding) *****/
  isOpen = signal(false);

  /***** Outputs *****/
  closed = output<void>();
  opened = output<void>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`size-${this.size()}`, this.isOpen() ? 'open' : ''].join(' ');
  });

  open(): void {
    this.isOpen.set(true);
    this.opened.emit();
    // Empêcher le scroll du body
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
    // Réactiver le scroll du body
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
