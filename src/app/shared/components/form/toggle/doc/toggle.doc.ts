// Imports Angular
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Text, Toggle, Card, Code } from '../../../';
import { Preview } from '@features/documentation/children/preview/preview';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Toggle as ToggleType } from '../toggle.type';
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';

/***** import de variables  *****/
import { primaryColors, semanticColors } from '@shared/variables/colors';

/***** Import de configuration *****/
import { DOCUMENTATION_TEMPLATE_CONFIG } from '@features/documentation/children/documentation-template/documentation-template.config';

@Component({
  selector: 'app-toggle-doc',
  imports: [DocumentationTemplate, Flex, Text, Toggle, Preview, Card, Code, TooltipDirective],
  templateUrl: './toggle.doc.html',
})
export class ToggleDoc {
  documentationTemplateConfig = DOCUMENTATION_TEMPLATE_CONFIG;

  primaryColors = primaryColors;
  semanticColors = semanticColors;

  sizes: ToggleType.Size[] = ['sm', 'md', 'lg', 'xl'];

  toggleCheckedColorsVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.primaryColors.forEach((color) => {
      const key = color;
      combinations[key] = true;
    });

    return combinations;
  })();

  toggleCheckedSizesVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.sizes.forEach((size) => {
      const key = size;
      combinations[key] = true;
    });

    return combinations;
  })();

  inputsMetadata: DocumentationType.InputConfig[] = [
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

  modelsMetadata: DocumentationType.ModelConfig[] = [
    {
      name: 'checked',
      default: false,
      type: 'boolean',
      description: 'État coché du toggle',
    },
  ];

  outputsMetadata: DocumentationType.OutputConfig[] = [
    {
      name: 'checkedChange',
      type: 'boolean',
      description: "Événement émis lorsque l'état coché change",
    },
  ];

  semanticColorExempleCode = `@for (color of semanticColors; track $index) {
    <app-toggle
        [color]="color"
        size="md"
        borderRadius="full"
        [tooltip]="{
            content: color,
        }"
    />
}`;

  primaryColorExempleCode = `@for (color of primaryColors; track $index) {
    <app-toggle
        [color]="color"
        size="md"
        borderRadius="full"
        [tooltip]="{
            content: color,
        }"
    />
}`;

  sizesExempleCode = `@for (size of sizes; track $index) {
    <app-toggle
        color="primary"
        [size]="size"
        borderRadius="full"
        [tooltip]="{
            content: size,
        }"
    />
}`;

  disabledExempleCode = `<app-toggle
    color="primary"
    borderRadius="full"
    disabled
/>`;
}
