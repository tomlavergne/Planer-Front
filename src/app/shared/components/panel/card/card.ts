/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Import de types *****/
import type { Card as CardType } from './card.type';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Card {
  /******************/
  /***** Inputs *****/
  /******************/

  variant = input<CardType.Variant>('soft');
  padding = input<CardType.Padding>('md');
  backgroundColor = input<'primary' | 'secondary' | 'tertiary' | null>(null);

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      `padding-${this.padding()}`,
      this.backgroundColor() ? `bg-${this.backgroundColor()}` : '',
    ];
  });
}
