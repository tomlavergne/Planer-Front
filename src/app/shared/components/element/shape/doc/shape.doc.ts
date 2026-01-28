/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex } from '../../../layout/flex/flex';
import { Shape } from '../shape';
import { Text } from '../../../display/text/text';

/***** Import de types *****/
import type { Shape as ShapeType } from '../shape.type';
import type { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'app-shape-documentation',
  imports: [DocumentationTemplate, Flex, Shape, Text],
  templateUrl: './shape.doc.html',
})
export class ShapeDoc {
  types: ShapeType.Type[] = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'];

  colors: ShapeType.Color[] = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'neutral',
  ];
  sizes: ShapeType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'type',
      default: 'circle' as ShapeType.Type,
      type: '"circle" | "square" | "triangle" | "diamond" | "hexagon" | "star"',
      description: 'Type de forme',
    },
    {
      name: 'color',
      default: 'blue' as ShapeType.Color | null,
      type: 'Color | null',
      description: 'Couleur de la forme',
    },
    {
      name: 'size',
      default: 'md' as ShapeType.Size,
      type: '"circle" | "square" | "triangle" | "diamond" | "hexagon" | "star"',
      description: 'Taille de la forme',
    },
  ];

  colorExempleCode = `@for (color of [${this.colors.toString()}] track $index) {
    <Button
        [text]="color"
        [color]="color"
        size="sm"
        borderRadius="full"
    />
}`;

  sizeExempleCode = `@for (size of [${this.sizes.toString()}]; track $index) {
    <Button
        [text]="size"
        [variant]="variant"
        size="sm"
        borderRadius="full"
    />
}`;
}
