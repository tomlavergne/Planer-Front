/***** Imports de Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Shape } from '../shape/shape';
import { Text } from '../text/text';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-separator',
  imports: [Flex, Shape, Text],
  templateUrl: 'separator.html',
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
  text = input<string | null>(null);

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`orientation-${this.orientation()}`].join(' ');
  });
}
