import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import * as lucideIcons from '@ng-icons/lucide';
import { IconSize } from '../../types/common.types';

/***** Déclaration de types *****/
type IconVariant = 'primary' | 'secondary' | 'danger';
type LucideIconName = keyof typeof lucideIcons;

@Component({
  selector: 'app-icon',
  imports: [NgIcon],
  template: `
    <ng-icon [name]="name()" [size]="size()" [strokeWidth]="strokeWidth()" [class]="variant()" />
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class Icon {
  /** Nom de l’icône (clé ng-icons) */
  name = input.required<LucideIconName>();

  /** Taille en px */
  size = input<IconSize>('24');

  /** Couleur */
  variant = input<IconVariant>('primary');

  /** Épaisseur du trait */
  strokeWidth = input<number>(2);
}
