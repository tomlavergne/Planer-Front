/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Text, Card, Code, ColorPicker, Slider, Box } from '@shared/components';
import { DocumentationTemplate } from '../../children/documentation-template/documentation-template';
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import { PrimaryColor, SemanticColor } from '@shared/types/ui.types';
import { Text as TextType } from '@shared/components/display/text/text.type';
import { Box as BoxType } from '@shared/components/layout/box/box.type';

@Component({
  selector: 'app-colors',
  imports: [Flex, Text, Card, Code, ColorPicker, Slider, DocumentationTemplate, Box],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  themeService = inject(ThemeService);

  primaryColors: BoxType.Color[] = [
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

  semanticColors: BoxType.Color[] = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'danger',
  ];

  backgroundColor: BoxType.Color[] = [
    'background-primary',
    'background-secondary',
    'background-tertiary',
    'background-inverse',
  ];

  textColor: TextType.Color[] = [
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-inverse',
    'text-disabled',
  ];
}
