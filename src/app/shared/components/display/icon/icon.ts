import { Component, input, computed } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import * as lucideIcons from '@ng-icons/lucide';
import type { IconSize, ColorVariant } from '../../../types';

/***** Déclaration de types *****/
type LucideIconName = keyof typeof lucideIcons;

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
  variant = input<ColorVariant>('primary');

  /***** Computeds *****/
  hostClasses = computed(() => {
    return [`variant-${this.variant()}`].join(' ');
  });
}
