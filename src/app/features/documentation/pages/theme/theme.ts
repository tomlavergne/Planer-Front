/***** Import Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button, Text, SegmentedControl } from '@shared/components';
import { DocumentationTemplate } from '@features/documentation/children/documentation-template/documentation-template';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-theme',
  imports: [Flex, DocumentationTemplate, Button, Text, SegmentedControl],
  templateUrl: './theme.html',
})
export class Theme {
  themeService = inject(ThemeService);

  // Liste des couleurs primaires disponibles
  primaryColors = primaryColors;

  /*******************/
  /***** METHODS *****/
  /*******************/

  setTheme(theme: string | null): void {
    if (theme === 'light' || theme === 'dark' || theme === 'auto') {
      this.themeService.setTheme(theme);
    }
  }

  setPrimaryColor(color: PrimaryColor): void {
    this.themeService.setPrimaryColor(color);
  }
}
