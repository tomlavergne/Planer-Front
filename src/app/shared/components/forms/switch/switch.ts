/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, model } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../../display/text/text';

/***** Imports de types *****/
import { Size } from '../../../types';

@Component({
  selector: 'app-switch',
  imports: [Flex, Text],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Switch {
  /***** Inputs *****/
  label = input<string | null>(null);
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Model (two-way binding) *****/
  checked = model<boolean>(false);

  /***** Outputs *****/
  checkedChange = output<boolean>();

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      this.disabled() ? 'disabled' : '',
      this.checked() ? 'checked' : '',
    ].join(' ');
  });

  toggle(): void {
    if (this.disabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }
}
