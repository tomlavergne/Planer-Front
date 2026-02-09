/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { Preview, DocumentationTemplate } from '@features/documentation/';
import { Card, Flex, Button, Text, Icon, Code, Shape } from '@shared/components/';

/***** Import de directives *****/
import { TooltipDirective } from '@shared/directives/';

/***** Import de types *****/
import type { Button as ButtonType } from '../button.type';
import type { Icon as IconType } from '@shared/components/misc/icon/icon.type';
import type { Documentation as DocumentationType } from '@features/documentation/documentation.type';

/***** Import de variables  *****/
import { primaryColors, semanticColors } from '@shared/variables/colors';
import { DOCUMENTATION_TEMPLATE_CONFIG } from '@features/documentation/children/documentation-template/documentation-template.config';

/***** Import de configuration *****/

@Component({
  selector: 'Button-documentation',
  imports: [
    DocumentationTemplate,
    Flex,
    Button,
    Icon,
    Text,
    Card,
    Code,
    Shape,
    Preview,
    TooltipDirective,
  ],
  templateUrl: './button.doc.html',
})
export class ButtonDoc {
  documentationTemplateConfig = DOCUMENTATION_TEMPLATE_CONFIG;

  primaryColors = primaryColors;
  semanticColors = semanticColors;

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

  disabledExempleCode = `<Button text="Disabled" size="sm" color="primary" disabled />`;
}
