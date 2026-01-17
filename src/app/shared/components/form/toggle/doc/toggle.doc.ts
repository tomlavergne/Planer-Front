// Imports Angular
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Button, Text, Toggle } from '../../../';
import { CodeExemple } from '../../../../../features/documentation/children/code-exemple/code-exemple';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Toggle as ToggleType } from '../toggle.type';
import type { InputConfig, ModelConfig, OutputConfig } from '../../../../types/utils.types';

@Component({
  selector: 'app-toggle-doc',
  imports: [DocumentationTemplate, Flex, Button, Text, Toggle, CodeExemple, TooltipDirective],
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

  inputsMetadata: InputConfig[] = [
    {
      name: 'label',
      default: null as string | null,
      type: 'string | null',
      description: 'Texte du label associé au toggle',
    },
    {
      name: 'variant',
      default: 'solid' as ToggleType.Variant,
      type: '"solid" | "soft"',
      description: 'Variant visuel du toggle',
    },
    {
      name: 'color',
      default: 'blue' as ToggleType.Color | null,
      type: 'Color | null',
      description: 'Couleur du toggle',
    },
    {
      name: 'size',
      default: 'md' as ToggleType.Size,
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: 'Taille du toggle',
    },
    {
      name: 'disabled',
      default: false,
      type: 'boolean',
      description: 'Désactive le toggle',
    },
  ];

  modelsMetadata: ModelConfig[] = [
    {
      name: 'checked',
      default: false,
      type: 'boolean',
      description: 'État coché du toggle',
    },
  ];

  outputsMetadata: OutputConfig[] = [
    {
      name: 'checkedChange',
      type: 'boolean',
      description: "Événement émis lorsque l'état coché change",
    },
  ];

  colorExempleCode = `@for (color of [${this.colors.toString()}] track $index) {
    <app-button
        [text]="color"
        [color]="color"
        size="sm"
        borderRadius="full"
    />
}`;
}
