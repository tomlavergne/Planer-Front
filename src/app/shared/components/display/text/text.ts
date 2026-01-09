/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

/***** Import de types *****/
import type { Text as TextTypes } from './text.type';

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
  color = input<TextTypes.Color | 'text'>('blue'); // TODO: Mettre à jour avec TextTypes.Variant une fois corrigé
  size = input<TextTypes.Size | null>(null);
  weight = input<TextTypes.Weight | null>(null);
  align = input<TextTypes.Align>('left');
  decoration = input<TextTypes.Decoration | null>(null);
  truncate = input<boolean>(false);
  italic = input<boolean>(false);
  underline = input<boolean>(false);
  wrap = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Computed *****/
  hostClasses = computed(() => {
    return [
      `color-${this.color()}`,
      `font-size-${this.size()}`,
      `weight-${this.weight()}`,
      `align-${this.align()}`,
      `truncate-${this.truncate()}`,
      `italic-${this.italic()}`,
      `decoration-${this.decoration()}`,
      `underline-${this.underline()}`,
      `as-${this.as()}`,
      this.wrap() ? 'wrap' : 'no-wrap',
      this.fullWidth() ? 'full-width' : '',
    ].join(' ');
  });
}
