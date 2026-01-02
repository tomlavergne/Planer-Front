/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/***** Imports de types *****/
import { Size } from '../../../types/';

type ProgressVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-progress',
  imports: [DecimalPipe],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'progressbar',
    '[attr.aria-valuenow]': 'value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
  },
})
export class Progress {
  /***** Inputs *****/
  value = input<number>(0);
  max = input<number>(100);
  size = input<Size>('md');
  variant = input<ProgressVariant>('default');
  indeterminate = input<boolean, any>(false, { transform: booleanAttribute });
  showValue = input<boolean, any>(false, { transform: booleanAttribute });

  // Computed pour le pourcentage
  percentage = computed(() => {
    if (this.indeterminate()) return 0;
    const val = Math.min(Math.max(this.value(), 0), this.max());
    return (val / this.max()) * 100;
  });

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      `variant-${this.variant()}`,
      this.indeterminate() ? 'indeterminate' : '',
    ].join(' ');
  });
}
