/***** Imports Angular *****/
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/***** Imorts de composants *****/
import { Sidebar } from '../../../../core/layout/sidebar/sidebar';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';
import { Button } from '../../../../shared/components';

@Component({
  selector: 'app-settings-sidebar',
  imports: [RouterLink, Sidebar, SidebarItem, Button],
  templateUrl: './settings-sidebar.html',
  styleUrl: './settings-sidebar.scss',
})
export class SettingsSidebar {}
