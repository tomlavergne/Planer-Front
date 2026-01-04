/***** Imports de Angular *****/
import { Component, signal, computed } from '@angular/core';

/***** Imports de composants *****/
import { Button } from '../../../shared/components/forms/button/button';
import { Popover } from '../../../shared/components/overlay/popover/popover';
import { SidebarItem } from './sidebar-item/sidebar-item';
import { Avatar } from '../../../shared/components/display/avatar/avatar';
import { Icon } from '../../../shared/components/display/icon/icon';
import { UserPopoverContent } from './user-popover-content/user-popover-content';
import { Flex } from '../../../shared/components/layout/flex/flex';
import { Text } from '../../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../shared/directives/tooltip/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [
    Button,
    Text,
    SidebarItem,
    Popover,
    Avatar,
    Icon,
    UserPopoverContent,
    Flex,
    TooltipDirective,
    Text,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Sidebar {
  /***** Signals *****/
  expanded = signal<boolean>(true);
  isHoveringLogo = signal<boolean>(false);
  currentTheme = signal<string>(document.documentElement.getAttribute('data-theme') || 'light');

  /***** Computed *****/
  iconNameTheme = computed(() => {
    return this.currentTheme() === 'dark' ? 'lucideSun' : 'lucideMoon';
  });

  hostClasses = computed(() => {
    return this.expanded() ? 'expanded' : 'collapsed';
  });

  /***** Methods *****/
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
