/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { Sidebar } from '../../../../core/layout/sidebar/sidebar';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';
import { Flex, Text, Button } from '../../../../shared/components';

/***** Import de types *****/
import type { Routing } from '@shared/types/routing.type';

import { DOCUMENTED_COMPONENTS } from '../../documentation.config';

@Component({
  selector: 'app-documentation-sidebar',
  imports: [Sidebar, SidebarItem, Flex, Text, Button],
  templateUrl: './documentation-sidebar.html',
  styleUrl: './documentation-sidebar.scss',
})
export class DocumentationSidebar {
  indexConfiguration: Routing.Index = DOCUMENTED_COMPONENTS;
}
