/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

/***** Imports de types *****/
import { Flex as FlexType } from '../../../../shared/types/';

@Component({
  selector: 'app-flex',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './flex.scss',
  host: {
    // Liaison dynamique des classes sur l'élément host
    '[class]': 'hostClasses()',
  },
})
export class Flex {
  /***** Inputs *****/
  direction = input<FlexType.Direction>('row');
  alignItems = input<FlexType.Align>('stretch');
  justifyContent = input<FlexType.Justify>('start');
  gap = input<FlexType.Gap>('none');
  padding = input<FlexType.Padding>('none');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  fullHeight = input<boolean, any>(false, { transform: booleanAttribute });

  // Computed signal pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      `direction-${this.direction()}`,
      `alignItems-${this.alignItems()}`,
      `justifyContent-${this.justifyContent()}`,
      `padding-${this.padding()}`,
      this.gap() !== 'none' ? `gap-${this.gap()}` : '',
      this.fullWidth() ? 'full-width' : '',
      this.fullHeight() ? 'full-height' : '',
    ].join(' ');
  });
}
