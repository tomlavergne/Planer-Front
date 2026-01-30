/***** Imports Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Badge } from '@shared/components';

/***** Import de types *****/

@Component({
  selector: 'app-preview',
  imports: [Flex, Badge],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
  host: {
    class: 'app-preview',
  },
})
export class Preview {
  limitHeight = input<boolean, null>(false, { transform: booleanAttribute });

  hostClasses = computed(() => [this.limitHeight() ? 'limit-height' : ''].join(' '));
}
