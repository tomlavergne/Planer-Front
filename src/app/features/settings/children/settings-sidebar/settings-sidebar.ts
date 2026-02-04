/***** Imports Angular *****/
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/***** Imorts de composants *****/
import { Sidebar } from '../../../../core/layout/sidebar/sidebar';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';
import { Button, Flex, Text, Avatar, Icon } from '@shared/components';

/***** Import de configuration *****/
import { SETTING_ROUTES } from '@features/settings/settings.config';

/***** Import de types *****/
import type { Routing } from '@shared/types/routing.type';

@Component({
  selector: 'app-settings-sidebar',
  imports: [RouterLink, Sidebar, SidebarItem, Button, Flex, Text, Icon, Avatar],
  templateUrl: './settings-sidebar.html',
  styleUrl: './settings-sidebar.scss',
})
export class SettingsSidebar {
  indexConfiguration: Routing.Index = SETTING_ROUTES;
}
