/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../icon/icon';
import { Flex } from '../layout/flex/flex';

/***** Imports de types *****/
import { IconSize, Size } from '../../types/common.types';
import { LucideIconName } from '../../types/common.types';

/***** Autres imports *****/

/***** Déclaration de types *****/
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type IconPosition = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'app-button',
  imports: [Icon, Flex],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    // Liaison dynamique des classes sur l'élément host
    '[class]': 'hostClasses()',
  },
})
export class Button {
  /***** Inputs *****/
  label = input<string | null>(null);
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<ButtonVariant>('primary');
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  iconName = input<LucideIconName | null>(null);
  iconPosition = input<IconPosition>('left');
  displayChevronRight = input<boolean, any>(false, { transform: booleanAttribute });

  rounded = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Outputs *****/
  clicked = output<void>();

  // Computed signal pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      `size-${this.size()}`,
      `icon-${this.iconPosition()}`,
      this.fullWidth() ? 'full-width' : '',
      this.iconPosition(),
      this.rounded() ? 'rounded' : '',
    ].join(' ');
  });

  // Computed signal pour la taille de l'icône
  iconSize = computed(() => {
    const sizeMap: Record<Size, IconSize> = {
      xs: '16',
      sm: '16',
      md: '20',
      lg: '24',
    };
    return sizeMap[this.size()];
  });

  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
