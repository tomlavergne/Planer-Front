/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { CodeExemple } from '../../../../../features/documentation/children/code-exemple/code-exemple';
import { Flex } from '../../../layout/flex/flex';
import { Button } from '../button';
import { Code } from '../../../display/code/code';
import { Text } from '../../../display/text/text';
import { Icon } from '../../../display/icon/icon';

/***** Import de types *****/
import type { Button as ButtonType } from '../button.type';
import type { Icon as IconType } from '../../../display/icon/icon.type';
import type { InputConfig, OutputConfig } from '../../../../types/utils.types';

@Component({
  selector: 'app-button-documentation',
  imports: [DocumentationTemplate, Flex, Button, CodeExemple, Icon, Text],
  templateUrl: './button.doc.html',
})
export class ButtonDoc {
  colors: ButtonType.Color[] = [
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
    'black',
  ];
  variants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];
  sizes: ButtonType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

  inputsMetadata: InputConfig[] = [
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
    {
      name: 'color',
      default: 'blue' as ButtonType.Color | null,
      type: 'Color | null',
      description: 'Couleur du bouton',
    },
    {
      name: 'disabled',
      default: false,
      type: 'boolean',
      description: 'Désactive le bouton',
    },
    {
      name: 'iconLeft',
      default: null as IconType.Name | null,
      type: 'IconType.Name | null',
      description: 'Icône à gauche du texte',
    },
    {
      name: 'iconRight',
      default: null as IconType.Name | null,
      type: 'IconType.Name | null',
      description: 'Icône à droite du texte',
    },
    {
      name: 'size',
      default: 'md' as ButtonType.Size,
      type: '"xs" | "sm" | "md" | "lg" | "xl"',
      description: 'Taille du bouton',
    },
    {
      name: 'borderRadius',
      default: 'md' as ButtonType.BorderRadius,
      type: '"sm" | "md" | "lg" | "full"',
      description: 'Rayon des bordures',
    },
    {
      name: 'fullWidth',
      default: false,
      type: 'boolean',
      description: 'Bouton prend toute la largeur',
    },
  ];

  outputsMetadata: OutputConfig[] = [
    {
      name: 'clicked',
      type: 'MouseEvent',
      description: 'Événement émis lors du clic sur le bouton',
    },
  ];

  contentExempleCode = `// Text only button
<app-button text="Text only" size="sm" borderRadius="full" />

// Icon only button
<app-button size="sm" iconLeft="lucideStar" borderRadius="full" />

// Custom content button
<app-button size="sm" borderRadius="full">
    <app-flex direction="row" alignItems="center" gap="sm">
        <app-text size="sm" color="primary-inverse">Custom Content</app-text>

        <app-icon color="white" name="lucideStar" size="sm" />

        <app-text size="sm" color="primary-inverse">Custom Content</app-text>
    </app-flex>

</app-button>`;

  colorExempleCode = `@for (color of [${this.colors.toString()}] track $index) {
    <app-button
        [text]="color"
        [color]="color"
        size="sm"
        borderRadius="full"
    />
}`;

  variantExempleCode = `@for (variant of [${this.variants.toString()}]; track $index) {
    <app-button
        [text]="variant"
        [variant]="variant"
        size="sm"
        borderRadius="full"
    />
}`;

  sizeExempleCode = `@for (size of [${this.sizes.toString()}]; track $index) {
    <app-button
        [text]="size"
        [variant]="variant"
        size="sm"
        borderRadius="full"
    />
}`;

  disabledExempleCode = `<app-button text="Disabled" size="sm" color="blue" borderRadius="full" disabled />`;
}
