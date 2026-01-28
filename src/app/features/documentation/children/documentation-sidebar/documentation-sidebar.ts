/***** Imports Angular *****/
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/***** Import de composants *****/
import { Sidebar } from '../../../../core/layout/sidebar/sidebar';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';
import { Flex, Text, Button } from '../../../../shared/components';

/***** Import de types *****/
import type { Documentation as DocumentationType } from '../../documentation.type';

import { DOCUMENTED_COMPONENTS } from '../../documentation.config';

@Component({
  selector: 'app-documentation-sidebar',
  imports: [RouterLink, Sidebar, SidebarItem, Flex, Text, Button],
  templateUrl: './documentation-sidebar.html',
  styleUrl: './documentation-sidebar.scss',
})
export class DocumentationSidebar {
  indexConfiguration: DocumentationType.Index = DOCUMENTED_COMPONENTS;
}
