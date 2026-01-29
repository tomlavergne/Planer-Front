/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { DocumentationUsage } from '@features/documentation/children/documentation-usage/documentation-usage';
import { Flex } from '../../../layout/flex/flex';
import { Button } from '../button';
import { Text } from '../../../display/text/text';
import { Icon } from '../../../display/icon/icon';

/***** Import de types *****/
import type { Button as ButtonType } from '../button.type';
import type { Icon as IconType } from '../../../display/icon/icon.type';
import type { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'Button-documentation',
  imports: [DocumentationTemplate, Flex, Button, Icon, Text, DocumentationUsage],
  templateUrl: './button.doc.html',
})
export class ButtonDoc {
  primaryColors: ButtonType.Color[] = [
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

  semanticColors: ButtonType.Color[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ];
  variants: ButtonType.Variant[] = ['solid', 'soft', 'subtle', 'outline', 'ghost', 'link'];
  sizes: ButtonType.Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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

  outputsMetadata: DocumentationType.OutputConfig[] = [
    {
      name: 'clicked',
      type: 'MouseEvent',
      description: 'Événement émis lors du clic sur le bouton',
    },
  ];

  contentExempleCode = `// Text only button
<Button text="Text only" size="sm" borderRadius="full" />

// Icon only button
<Button size="sm" iconLeft="lucideStar" borderRadius="full" />

// Custom content button
<Button size="sm" borderRadius="full">
    <app-flex direction="row" alignItems="center" gap="sm">
        <Text size="sm" color="primary-inverse">Custom Content</Text>

        <app-icon color="white" name="lucideStar" size="sm" />

        <Text size="sm" color="primary-inverse">Custom Content</Text>
    </app-flex>

</Button>`;

  colorExempleCode = `@for (color of [${this.semanticColors.toString()}] track $index) {
    <Button
        [text]="color"
        [color]="color"
        size="sm"
        borderRadius="full"
    />
}`;

  variantExempleCode = `@for (variant of [${this.variants.toString()}]; track $index) {
    <Button
        [text]="variant"
        [variant]="variant"
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

  disabledExempleCode = `<Button text="Disabled" size="sm" color="primary" borderRadius="full" disabled />`;
}
