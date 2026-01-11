// Imports Angular
import { Component, signal } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Toggle, Text } from '../../../../../../shared/components';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import { Toggle as ToggleType } from '../../../../../../shared/components/forms/toggle/toggle.type';

@Component({
  selector: 'app-toggle-documentation',
  imports: [DocumentationTemplate, Flex, Toggle, Text, TooltipDirective],
  templateUrl: './toggle-documentation.html',
  styleUrl: './toggle-documentation.scss',
})
export class ToggleDocumentation {
  colors: ToggleType.Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];
  variants: ToggleType.Variant[] = ['solid', 'soft'];
  sizes: ToggleType.Size[] = ['sm', 'md', 'lg', 'xl'];

  isChecked = signal(false);

  toggleCheckedColorsVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.variants.forEach((variant) => {
      this.colors.forEach((color) => {
        const key = `${variant}_${color}`;
        combinations[key] = false;
      });
    });

    return combinations;
  })();

  toggleCheckedSizesVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.variants.forEach((variant) => {
      this.sizes.forEach((size) => {
        const key = `${variant}_${size}`;
        combinations[key] = false;
      });
    });

    return combinations;
  })();
}
