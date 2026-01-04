/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Flex } from '../../layout/flex/flex';
import { Ripple } from '../../design/ripple/ripple';

/***** Imports de types *****/
import {
  IconSize,
  Size,
  LucideIconName,
  Position,
  Button as ButtonType,
  Color,
} from '../../../types';

@Component({
  selector: 'app-button',
  imports: [Flex, Text, Icon, Ripple],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Button {
  /***** Inputs *****/
  text = input<string | null>(null);
  type = input<ButtonType.Type>('button');
  variant = input<ButtonType.Variant>('solid');
  color = input<Color | null>('blue');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  icon = input<{
    name: LucideIconName;
    position?: Position;
  } | null>(null);
  size = input<Size>('md');
  borderRadius = input<ButtonType.BorderRadius>('md');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Outputs *****/
  clicked = output<void>();

  // Computed pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      `color-${this.color()}`,
      `size-${this.size()}`,
      `icon-${this.icon()?.position}`,
      `border-radius-${this.borderRadius()}`,
      this.fullWidth() ? 'full-width' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  // Computed pour la taille de l'icône
  iconSize = computed(() => {
    const sizeMap: Record<Size, IconSize> = {
      xs: '16',
      sm: '16',
      md: '20',
      lg: '24',
    };
    return sizeMap[this.size()];
  });

  // Computed pour la couleur du contenu (texte et icône)
  contentColor = computed((): Color => {
    return this.variant() === 'solid' ? 'white' : this.color() || 'gray';
  });

  // Computed pour la direction du Flex interne en fonction de la position de l'icône
  direction = computed(() => {
    switch (this.icon()?.position) {
      case 'left':
        return 'row';
      case 'right':
        return 'row-reverse';
      case 'top':
        return 'column';
      case 'bottom':
        return 'column-reverse';
      default:
        return 'row';
    }
  });

  /***** Méthodes *****/
  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
