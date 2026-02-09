// Imports Angular
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Text, Toggle, Card, Code, SegmentedControl } from '../../..';
import { Preview } from '@features/documentation/children/preview/preview';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';

/***** import de variables  *****/
import { primaryColors, semanticColors } from '@shared/variables/colors';

/***** Import de configuration *****/
import { DOCUMENTATION_TEMPLATE_CONFIG } from '@features/documentation/children/documentation-template/documentation-template.config';

@Component({
  selector: 'app-segmented-control-doc',
  imports: [
    DocumentationTemplate,
    Flex,
    Text,
    Toggle,
    Preview,
    Card,
    Code,
    SegmentedControl,
    TooltipDirective,
  ],
  templateUrl: './segmented-control.doc.html',
})
export class SegmentedControlDoc {
  documentationTemplateConfig = DOCUMENTATION_TEMPLATE_CONFIG;

  primaryColors = primaryColors;
  semanticColors = semanticColors;

  toggleCheckedColorsVariants = (() => {
    const combinations: Record<string, boolean> = {};

    this.primaryColors.forEach((color) => {
      const key = color;
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
