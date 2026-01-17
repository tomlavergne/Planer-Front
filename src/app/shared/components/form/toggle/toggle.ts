/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, model } from '@angular/core';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';

/***** Imports de types *****/
import type { Toggle as ToggleType } from './toggle.type';

/***** Import de configuration *****/
import { TOGGLE_SIZES_CONFIG } from './toggle.config';

@Component({
  selector: 'app-toggle',
  imports: [Flex],
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.--toggle-height]': 'currentConfig().height',
  },
})
export class Toggle {
  /******************/
  /***** Inputs *****/
  /******************/

  label = input<string | null>(null);
  variant = input<ToggleType.Variant>('solid');
  color = input<ToggleType.Color>('blue');
  size = input<ToggleType.Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });

  /******************/
  /***** Models *****/
  /******************/

  checked = model<boolean>(false);

  /*******************/
  /***** Outputs *****/
  /*******************/

  checkedChange = output<boolean>();

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `variant-${this.variant()}`,
      `color-${this.color()}`,
      `size-${this.size()}`,
      this.disabled() ? 'disabled' : '',
      this.checked() ? 'checked' : '',
    ].join(' ');
  });

  // Computed pour la configuration courante
  currentConfig = computed(() => TOGGLE_SIZES_CONFIG[this.size()]);

  /*******************/
  /***** Methods *****/
  /*******************/

  toggle(): void {
    if (this.disabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.checkedChange.emit(newValue);
  }
}
