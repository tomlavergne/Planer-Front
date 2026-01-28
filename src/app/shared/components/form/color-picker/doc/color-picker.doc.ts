/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, ColorPicker, Text, Icon } from '@shared/components';

/***** Import de types *****/
import type { Button as ButtonType } from '../../button/button.type';
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'Button-documentation',
  imports: [DocumentationTemplate],
  templateUrl: './color-picker.doc.html',
})
export class ColorPickerDoc {
  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'text',
      default: null as string | null,
      type: 'string | null',
      description: 'Texte affiché dans le bouton',
    },
    {
      name: 'type',
      default: 'button' as ButtonType.Type,
      type: '"button" | "submit" | "reset"',
      description: 'Type HTML du bouton',
    },
    {
      name: 'variant',
      default: 'solid' as ButtonType.Variant,
      type: '"solid" | "outline" | "ghost" | "link"',
      description: 'Variant visuel du bouton',
    },
  ];

  outputsMetadata: DocumentationType.OutputConfig[] = [
    {
      name: 'clicked',
      type: 'MouseEvent',
      description: 'Événement émis lors du clic sur le bouton',
    },
  ];
}
