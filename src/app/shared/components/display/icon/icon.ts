/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

/***** Import de types *****/
import type { IconSize, Color, LucideIconName } from '../../../types';

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  template: ` <ng-icon [name]="name()" [size]="size()" [strokeWidth]="strokeWidth()" /> `,
  styleUrl: './icon.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Icon {
  /***** Inputs *****/
  name = input.required<LucideIconName>();
  size = input<IconSize>('24');
  strokeWidth = input<number>(2);
  color = input<Color | 'text'>('blue');

  /***** Computeds *****/
  hostClasses = computed(() => {
    return [`color-${this.color()}`].join(' ');
  });
}
