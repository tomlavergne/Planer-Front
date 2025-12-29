/***** Imports de Angular *****/
import { Component, signal, computed } from '@angular/core';

/***** Imports de composants *****/
import { Button } from '../../../shared/components/button/button';
import { Tooltip } from '../../../shared/components/overlay/tooltip/tooltip';
import { Popover } from '../../../shared/components/overlay/popover/popover';
import { SidebarItem } from './sidebar-item/sidebar-item';
import { Avatar } from '../../../shared/components/avatar/avatar';
import { Icon } from '../../../shared/components/icon/icon';
import { UserPopoverContent } from './user-popover-content/user-popover-content';
import { Flex } from '../../../shared/components/layout/flex/flex';

@Component({
  selector: 'app-sidebar',
  imports: [Button, SidebarItem, Tooltip, Popover, Avatar, Icon, UserPopoverContent, Flex],
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
