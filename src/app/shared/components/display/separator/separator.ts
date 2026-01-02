/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-separator',
  imports: [],
  template: '',
  styleUrl: './separator.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class Separator {
  /***** Inputs *****/
  orientation = input<Orientation>('horizontal');

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`orientation-${this.orientation()}`].join(' ');
  });
}
