import { Component, input, computed, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-flex',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './flex.scss',
  host: {
    // Liaison dynamique des classes sur l'élément host
    '[class]': 'flexClasses()',
  },
})
export class Flex {
  /***** Inputs *****/
  direction = input<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  alignItems = input<'start' | 'center' | 'end' | 'stretch' | 'baseline'>('stretch');
  justifyContent = input<'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'>('start');
  gap = input<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('none');
  padding = input<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('none');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  fullHeight = input<boolean, any>(false, { transform: booleanAttribute });

  // Computed signal pour générer les classes dynamiquement
  flexClasses = computed(() => {
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
