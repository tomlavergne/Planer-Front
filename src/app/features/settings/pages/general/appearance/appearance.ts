/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants  *****/
import { SettingTemplate, SettingGroup, SettingItem } from '@features/settings/';
import { Flex, Text, Button, Separator, Select } from '@shared/components';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-appearance',
  imports: [SettingTemplate, Flex, Text, Button, Separator, SettingGroup, SettingItem, Select],
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

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setPrimaryColor(color: PrimaryColor): void {
    this.themeService.setPrimaryColor(color);
  }
}
