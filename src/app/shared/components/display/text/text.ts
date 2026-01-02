/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

import type { Text as TextTypes, ColorVariant } from '../../../types/';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.html',
  styleUrl: './text.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Text {
  /***** Inputs *****/
  as = input<TextTypes.As>('p');
  variant = input<any>('body'); // TODO: Mettre à jour avec TextTypes.Variant une fois corrigé
  size = input<TextTypes.Size | null>(null);
  weight = input<TextTypes.Weight | null>(null);
  align = input<TextTypes.Align>('left');
  truncate = input<boolean>(false);
  italic = input<boolean>(false);
  underline = input<boolean>(false);

  /***** Computed *****/
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      `size-${this.size()}`,
      `weight-${this.weight()}`,
      `align-${this.align()}`,
      `truncate-${this.truncate()}`,
      `italic-${this.italic()}`,
      `underline-${this.underline()}`,
      `as-${this.as()}`,
    ].join(' ');
  });
}
