/***** Imports Angular *****/
import { Component, inject, signal } from '@angular/core';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';

/***** Import de composants  *****/
import { SettingTemplate, SettingGroup, SettingItem } from '@features/settings/';
import {
  Flex,
  Button,
  Box,
  Text,
  Separator,
  Select,
  SegmentedControl,
  SelectOptionTemplate,
} from '@shared/components';

/***** Import de service *****/
import { ThemeService } from '@shared/config/theme.service';

/***** Import de types *****/
import type { PrimaryColor } from '@shared/types';
import type { Select as SelectType } from '@shared/components/form/select/select.type';

/***** Import de variables *****/
import { primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-preference',
  imports: [
    SettingTemplate,
    Flex,
    Text,
    Box,
    Separator,
    Select,
    SegmentedControl,
    SettingGroup,
    SettingItem,
    TranslocoPipe,
    SelectOptionTemplate,
  ],
  templateUrl: './preference.html',
  styleUrl: './preference.scss',
})
export class Preference {
  themeService = inject(ThemeService);
  translocoService = inject(TranslocoService);

  currentLanguage = signal<string>(this.translocoService.getActiveLang());

  /*******************/
  /***** METHODS *****/
  /*******************/

  languageSelectOptions: SelectType.Option[] = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
  ];

  /***** LANGUE *****/

  setLanguage(locale: string | null): void {
    if (!locale) return;

    // Change la langue active de Transloco
    this.translocoService.setActiveLang(locale);
    this.currentLanguage.set(locale);

    // Stocke la préférence pour les prochains chargements
    localStorage.setItem('preferredLanguage', locale);
  }

  /***** THEME *****/

  setTheme(theme: string | null): void {
    if (theme === 'light' || theme === 'dark' || theme === 'auto') {
      this.themeService.setTheme(theme);
    }
  }

  /***** COULEUR PRIMAIRE *****/

  primaryColorSelectOptions: SelectType.Option[] = primaryColors.map((color) => ({
    value: color,
    label: color,
  }));

  setPrimaryColor(color: string | null): void {
    if (color && primaryColors.includes(color as PrimaryColor)) {
      this.themeService.setPrimaryColor(color as PrimaryColor);
    }
  }
}
