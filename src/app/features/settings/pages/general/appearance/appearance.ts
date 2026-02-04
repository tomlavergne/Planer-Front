/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants  *****/
import { SettingTemplate, SettingGroup, SettingItem } from '@features/settings/';
import { Flex, Button, Separator, SegmentedControl } from '@shared/components';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-appearance',
  imports: [SettingTemplate, Flex, Button, Separator, SegmentedControl, SettingGroup, SettingItem],
  templateUrl: './appearance.html',
  styleUrl: './appearance.scss',
})
export class Appearance {
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
