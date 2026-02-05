/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants  *****/
import { SettingTemplate, SettingGroup, SettingItem } from '@features/settings/';
import { Flex, Button, Separator, Select, SegmentedControl } from '@shared/components';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';
import type { Select as SelectType } from '@shared/components/form/select/select.type';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-appearance',
  imports: [
    SettingTemplate,
    Flex,
    Button,
    Separator,
    Select,
    SegmentedControl,
    SettingGroup,
    SettingItem,
  ],
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
    if (color && this.primaryColors.includes(color as PrimaryColor)) {
      this.themeService.setPrimaryColor(color as PrimaryColor);
    }
  }
}
