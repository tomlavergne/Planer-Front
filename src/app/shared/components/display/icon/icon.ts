/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

/***** Import de types *****/
import type { Icon as IconType, Color, LucideIconName } from '../../../types';

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  template: ` <ng-icon [name]="name()" [size]="IconSize()" [strokeWidth]="strokeWidth()" /> `,
  styleUrl: './icon.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Icon {
  /***** Inputs *****/
  name = input.required<LucideIconName>();
  size = input<IconType.Size>('sm');
  strokeWidth = input<number>(2);
  color = input<Color | 'text'>('blue');

  /***** Computeds *****/
  hostClasses = computed(() => {
    return [`color-${this.color()}`].join(' ');
  });

  IconSize = computed((): string => {
    const sizeMap: Record<IconType.Size, string> = {
      xs: '16',
      sm: '20',
      md: '24',
      lg: '32',
      xl: '40',
      '2xl': '48',
    };
    return sizeMap[this.size()];
  });
}
