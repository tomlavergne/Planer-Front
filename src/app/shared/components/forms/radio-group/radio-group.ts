/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, model } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de types *****/
import { Size } from '../../../types';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-radio-group',
  imports: [CommonModule],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'radiogroup',
  },
})
export class RadioGroup {
  /***** Inputs *****/
  options = input.required<RadioOption[]>();
  name = input<string>('radio-group');
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  orientation = input<'horizontal' | 'vertical'>('vertical');

  /***** Model (two-way binding) *****/
  value = model<string | null>(null);

  /***** Outputs *****/
  valueChange = output<string>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      `orientation-${this.orientation()}`,
      this.disabled() ? 'disabled' : '',
      this.error() ? 'error' : '',
    ].join(' ');
  });

  selectOption(option: RadioOption): void {
    if (option.disabled || this.disabled()) return;
    this.value.set(option.value);
    this.valueChange.emit(option.value);
  }

  isSelected(value: string): boolean {
    return this.value() === value;
  }
}
