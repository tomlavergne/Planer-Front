/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, inject } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import type { Button as ButtonType } from './button.type';
import type { Icon as IconType } from '../../display/icon/icon.type';
import type { Text as TextType } from '../../display/text/text.type';

/***** Import de configuration *****/
import { BUTTON_SIZES_CONFIG } from './button.config';

import { ThemeService } from '../../../config/theme.service';

@Component({
  selector: 'app-button',
  imports: [Flex, Text, Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Button {
  // Injection du service de thème
  themeService = inject(ThemeService);

  text = input<string | null>(null);
  type = input<ButtonType.Type>('button');
  variant = input<ButtonType.Variant>('solid');
  color = input<ButtonType.Color | null>('secondary');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  iconLeft = input<IconType.Name | null>(null);
  iconRight = input<IconType.Name | null>(null);
  size = input<ButtonType.Size>('md');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  fullHeight = input<boolean, any>(false, { transform: booleanAttribute });

  /******************/
  /***** OUTPUTS *****/
  /******************/

  clicked = output<MouseEvent>();

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      this.color ? `color-${this.color()}` : '',
      `size-${this.size()}`,
      `border-radius-${this.themeService.radius()}`,
      this.fullWidth() ? 'full-width' : '',
      this.fullHeight() ? 'full-height' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  // Computed pour la configuration actuelle en fonction de la taille
  currentConfig = computed(
    () => BUTTON_SIZES_CONFIG[this.size() as keyof typeof BUTTON_SIZES_CONFIG],
  );

  // Computed pour la couleur du contenu (texte et icône)
  contentColor = computed((): TextType.Color => {
    if (!this.color()) {
      return 'primary';
    }
    if (this.variant() === 'solid') {
      return 'text-inverse';
    } else {
      return this.color() || 'blue';
    }
  });

  /********************/
  /***** Méthodes *****/
  /********************/

  // Gestion du clic
  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
