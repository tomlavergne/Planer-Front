/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, model, signal } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../../misc/icon/icon';

/***** Imports de types *****/
import { Size } from '../../../types';

@Component({
  selector: 'app-checkbox',
  imports: [Icon],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Checkbox {
  /***** Inputs *****/
  label = input<string | null>(null);
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  indeterminate = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Model (two-way binding) *****/
  checked = model<boolean>(false);

  /***** Outputs *****/
  checkedChange = output<boolean>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      this.disabled() ? 'disabled' : '',
      this.error() ? 'error' : '',
      this.checked() ? 'checked' : '',
      this.indeterminate() ? 'indeterminate' : '',
    ].join(' ');
  });

  toggle(): void {
    if (this.disabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }
}
