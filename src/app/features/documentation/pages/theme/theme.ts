/***** Import Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button, Text, Select, SegmentedControl } from '@shared/components';
import { DocumentationTemplate } from '@features/documentation/children/documentation-template/documentation-template';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';
import type { Select as SelectType } from '@shared/components/form/select/select.type';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-theme',
  imports: [Flex, DocumentationTemplate, Button, Text, Select, SegmentedControl],
  templateUrl: './theme.html',
})
export class Theme {
  themeService = inject(ThemeService);

  /*******************/
  /***** METHODS *****/
  /*******************/

  options: SelectType.Option[] = primaryColors.map((color) => ({
    value: color,
    label: color.charAt(0).toUpperCase() + color.slice(1),
  }));

  setTheme(theme: string | null): void {
    if (theme === 'light' || theme === 'dark' || theme === 'auto') {
      this.themeService.setTheme(theme);
    }
  }

  setPrimaryColor(color: string | null): void {
    if (color && primaryColors.includes(color as PrimaryColor)) {
      this.themeService.setPrimaryColor(color as PrimaryColor);
    }
  }
}
