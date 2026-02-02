/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Text, Card, Box } from '@shared/components';
import { DocumentationTemplate } from '../../children/documentation-template/documentation-template';
import { ThemeService } from '@shared/config/theme.service';

/***** Imoprt de variables *****/
import {
  primaryColors,
  semanticColors,
  backgroundColor,
  textColor,
} from '@shared/variables/colors';

@Component({
  selector: 'app-colors',
  imports: [Flex, Text, Card, DocumentationTemplate, Box],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  themeService = inject(ThemeService);

  primaryColors = primaryColors;
  semanticColors = semanticColors;
  backgroundColor = backgroundColor;
  textColor = textColor;
}
