/***** Imports Angular *****/
import { Component, input, computed, signal, booleanAttribute, effect } from '@angular/core';

/***** Import de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Button } from '../../forms/button/button';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

/***** Imports de types *****/
import { Color, Accordion as AccordionType, LucideIconName } from '../../../types/';

@Component({
  selector: 'app-accordion',
  imports: [Flex, Button, Icon, Text],
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
  /***** Inputs *****/
  title = input<string>('Accordion Title');
  variant = input<AccordionType.Variant>('soft');
  color = input<Color>('gray');
  size = input<AccordionType.Size>('md');
  iconLeftName = input<LucideIconName | null>(null);
  startOpen = input<boolean, any>(false, { transform: booleanAttribute });
  contentPadding = input<boolean, any>(true, { transform: booleanAttribute });

  /***** Signals *****/
  isOpen = signal<boolean>(false);

  constructor() {
    effect(
      () => {
        this.isOpen.set(this.startOpen());
      },
      { allowSignalWrites: true },
    );
  }

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

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

  contentColor = computed((): Color => {
    return this.color() || 'gray';
  });
}
