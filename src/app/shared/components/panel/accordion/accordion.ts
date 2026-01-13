/***** Imports Angular *****/
import { Component, input, computed, signal, booleanAttribute, effect } from '@angular/core';

/***** Import de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Icon } from '../../display/icon/icon';
import { Text } from '../../display/text/text';

/***** Imports de types *****/
import { Color } from '../../../types/';
import type { Icon as IconType } from '../../display/icon/icon.type';
import type { Accordion as AccordionType } from './accordion.type';

/***** Import de configuration *****/
import { ACCORDION_SIZES_CONFIG } from './accordion.config';

@Component({
  selector: 'app-accordion',
  imports: [Flex, Icon, Text],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
  host: {
    '[class]': 'hostClasses()',
    '[attr.tabindex]': '0',
    '(keydown.enter)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
  },
})
export class Accordion {
  /******************/
  /***** Inputs *****/
  /******************/

  title = input<string>('Accordion Title');
  variant = input<AccordionType.Variant>('soft');
  color = input<Color>('gray');
  size = input<AccordionType.Size>('md');
  titleWeight = input<AccordionType.TitleWeight>('regular');
  iconLeftName = input<IconType.Name | null>(null);
  startOpen = input<boolean, any>(false, { transform: booleanAttribute });
  contentPadding = input<boolean, any>(true, { transform: booleanAttribute });

  /*******************/
  /***** Signals *****/
  /*******************/

  isOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.isOpen.set(this.startOpen());
    });
  }

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      this.isOpen() ? 'open' : 'closed',
      `variant-${this.variant()}`,
      `color-${this.color()}`,
      `size-${this.size()}`,
      `content-padding-${this.contentPadding() ? 'true' : 'false'}`,
    ].join(' ');
  });

  // Computed pour la couleur du contenu (icone + texte)
  contentColor = computed((): Color => {
    return this.color() || 'gray';
  });

  // Computed pour la configuration actuelle en fonction de la taille
  currentConfig = computed(() => ACCORDION_SIZES_CONFIG[this.size()]);

  /*******************/
  /***** Methods *****/
  /*******************/

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }
}
