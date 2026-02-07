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
  selector: 'app-profile',
  imports: [SettingTemplate, SettingGroup, SettingItem, Flex, Button, Separator],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
