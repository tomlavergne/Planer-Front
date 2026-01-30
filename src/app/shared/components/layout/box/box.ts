/***** Imports Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Import de composants *****/

/***** Import de types *****/
import type { Box as BoxType } from './box.type.ts';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.html',
  styleUrl: './box.scss',
  host: {
    '[style.height]': 'height()',
    '[style.width]': 'width()',
    '[class]': 'hostClasses()',
  },
})
export class Box {
  height = input<string | null>(null);
  width = input<string | null>(null);
  padding = input<BoxType.Padding>('none');
  margin = input<BoxType.Margin>('none');
  color = input<BoxType.Color | null>(null);

  /*********************/
  /***** Computeds *****/
  /*********************/

  hostClasses = computed(() => {
    return [
      `padding-${this.padding()}`,
      `margin-${this.margin()}`,
      this.color() ? `color-${this.color()}` : '',
    ].join(' ');
  });
}
