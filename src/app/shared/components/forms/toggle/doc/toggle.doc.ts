// Imports Angular
import { Component, signal } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Toggle, Text } from '../../..';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Toggle as ToggleType } from '../toggle.type';

@Component({
  selector: 'app-toggle-doc',
  imports: [DocumentationTemplate, Flex, Toggle, Text, TooltipDirective],
  templateUrl: './toggle.doc.html',
})
export class ToggleDoc {
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

  toggleCheckedColorsVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.variants.forEach((variant) => {
      this.colors.forEach((color) => {
        const key = `${variant}_${color}`;
        combinations[key] = true;
      });
    });

    return combinations;
  })();

  toggleCheckedSizesVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.variants.forEach((variant) => {
      this.sizes.forEach((size) => {
        const key = `${variant}_${size}`;
        combinations[key] = true;
      });
    });

    return combinations;
  })();
}
