/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import { Button as ButtonType } from './button.type';
import { Icon as IconType } from '../../display/icon/icon.type';
import { Color } from '../../../types';

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
  /** Texte affiché dans le bouton */
  text = input<string | null>(null);

  /** Type HTML du bouton */
  type = input<ButtonType.Type>('button');

  /** Variant visuel du bouton */
  variant = input<ButtonType.Variant>('solid');

  /** Couleur du bouton */
  color = input<Color | null>('blue');

  /** Désactive le bouton */
  disabled = input<boolean, any>(false, { transform: booleanAttribute });

  /** Icône à gauche du texte */
  iconLeft = input<IconType.Name | null>(null);

  /** Icône à droite du texte */
  iconRight = input<IconType.Name | null>(null);

  /** Taille du bouton */
  size = input<ButtonType.Size>('md');

  /** Rayon des bordures */
  borderRadius = input<ButtonType.BorderRadius>('md');

  /** Bouton prend toute la largeur */
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /** Active le style popo */
  popo = input<boolean, any>(false, { transform: booleanAttribute });

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
      `color-${this.color()}`,
      `size-${this.size()}`,
      `border-radius-${this.borderRadius()}`,
      this.fullWidth() ? 'full-width' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  // Computed pour la configuration actuelle en fonction de la taille
  currentConfig = computed(
    () => BUTTON_SIZES_CONFIG[this.size() as keyof typeof BUTTON_SIZES_CONFIG],
  );

  // Computed pour la couleur du contenu (texte et icône)
  contentColor = computed((): Color => {
    return this.variant() === 'solid' ? 'white' : this.color() || 'gray';
  });

  /*************************/
  /***** Content Child *****/
  /*************************/

  constructor() {}

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
