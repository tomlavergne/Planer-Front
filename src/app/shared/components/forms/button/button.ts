/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import { Position, Color, Direction } from '../../../types';
import type { Button as ButtonType } from './button.type';
import type { Icon as IconType } from '../../display/icon/icon.type';

/***** Import de configuration *****/
import { BUTTON_SIZES_CONFIG } from './button.config';

@Component({
  selector: 'app-button',
  imports: [Flex, Text, Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.--button-padding]': 'currentConfig().padding',
    '[style.--button-font-size]': 'currentConfig().fontSize',
  },
})
export class Button {
  /******************/
  /***** Inputs *****/
  /******************/

  text = input<string | null>(null);
  type = input<ButtonType.Type>('button');
  variant = input<ButtonType.Variant>('solid');
  color = input<Color | null>('blue');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  icon = input<{
    name: IconType.Name;
    position?: Position;
  } | null>(null);
  size = input<ButtonType.Size>('md');
  borderRadius = input<ButtonType.BorderRadius>('md');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /*******************/
  /***** Outputs *****/
  /*******************/

  clicked = output<void>();

  /*********************/
  /***** Computeds *****/
  /*********************/

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

  // Computed pour la configuration actuelle en fonction de la taille
  currentConfig = computed(() => BUTTON_SIZES_CONFIG[this.size()]);

  // Computed pour la couleur du contenu (texte et icône)
  contentColor = computed((): Color => {
    return this.variant() === 'solid' ? 'white' : this.color() || 'gray';
  });

  // Computed pour la direction du Flex interne en fonction de la position de l'icône
  direction = computed((): Direction => {
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

  /********************/
  /***** Méthodes *****/
  /********************/

  // Gestion du clic
  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
