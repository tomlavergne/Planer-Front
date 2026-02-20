/***** Imports de Angular *****/
import { Component, model, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import {
  Button,
  Flex,
  Avatar,
  Icon,
  Badge,
  Text,
  Card,
  Separator,
  Shape,
  Spacer,
} from '../../../../shared/components';
import { Logo } from '@shared/components/misc/logo/logo';
import { SidebarItem } from '../../../../core/layout/sidebar/children/sidebar-item/sidebar-item';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '@shared/directives';

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
    Logo,
    Card,
    Spacer,
    SidebarItem,
    TooltipDirective,
    PopoverDirective,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './workspace-sidebar.html',
  styleUrl: './workspace-sidebar.scss',
})
export class WorkspaceSidebar {
  router = inject(Router);

  expanded = model<boolean>(true);

  logout(): void {
    console.log('Déconnexion');

    // Redirection vers la page d'accueil après connexion
    this.router.navigate(['/login']);
  }
}
