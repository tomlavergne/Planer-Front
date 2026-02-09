/***** Imports de Angular *****/
import { Component, input, output, computed, booleanAttribute, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Flex, Button } from '@shared/components';

/***** Imports de types *****/
import type { SegmentedControl as SegmentedControlType } from './segmented-control.type';

/***** Import de configuration *****/
import { ThemeService } from '../../../config/theme.service';

@Component({
  selector: 'app-segmented-control',
  imports: [CommonModule, Flex, Button],
  templateUrl: './segmented-control.html',
  styleUrl: './segmented-control.scss',
  host: {
    '[class]': 'hostClasses()',
    role: 'group',
  },
})
export class SegmentedControl {
  // Injection du service de thème
  themeService = inject(ThemeService);

  /***** INPUTS *****/
  options = input.required<SegmentedControlType.Option[]>();
  name = input<string>('segmented-control');
  color = input<SegmentedControlType.Color>('primary');
  size = input<SegmentedControlType.Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });

  /***** MODEL (two-way binding) *****/
  value = model<string | null>(null);

  /***** OUTPUTS *****/
  valueChange = output<string>();

  /***** COMPUTED *****/
  hostClasses = computed(() => {
    return ['segmented-control', this.disabled() ? 'disabled' : ''].filter(Boolean).join(' ');
  });

  /***** METHODS *****/
  selectOption(option: SegmentedControlType.Option): void {
    if (option.disabled || this.disabled()) return;

    this.value.set(option.value);
    this.valueChange.emit(option.value);
  }

  isSelected(option: SegmentedControlType.Option): boolean {
    return this.value() === option.value;
  }

  isOptionDisabled(option: SegmentedControlType.Option): boolean {
    return this.disabled() || !!option.disabled;
  }
}
