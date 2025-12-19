import { Component, input, output, EventEmitter } from '@angular/core';
import * as lucideIcons from '@ng-icons/lucide';
import { Icon } from '../icon/icon';

/***** Déclaration de types *****/
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type iconPosition = 'top' | 'right' | 'bottom' | 'left';
type LucideIconName = keyof typeof lucideIcons;

@Component({
  selector: 'app-button',
  imports: [Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  /** Épaisseur du trait */
  label = input<string | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');
  isDisabled = input<boolean>(false);
  variant = input<ButtonVariant>('primary');
  iconName = input<LucideIconName | null>(null);
  iconPosition = input<iconPosition>('left');

  clicked = output<void>();

  onClick(): void {
    if (!this.isDisabled()) {
      this.clicked.emit();
    }
  }
}
