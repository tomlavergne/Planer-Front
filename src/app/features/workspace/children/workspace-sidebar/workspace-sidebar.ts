/***** Imports de Angular *****/
import { Component, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Button, Flex, Avatar, Icon, Text, Separator, Shape } from '../../../../shared/components';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import { Sidebar } from '../../../../core/layout/sidebar/sidebar';

@Component({
  selector: 'app-workspace-sidebar',
  imports: [
    Sidebar,
    Flex,
    Button,
    Avatar,
    Icon,
    Text,
    Separator,
    Shape,
    SidebarItem,
    TooltipDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './workspace-sidebar.html',
  styleUrl: './workspace-sidebar.scss',
})
export class WorkspaceSidebar {
  expanded = model<boolean>(true);
}
