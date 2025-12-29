/***** Imports de Angular *****/
import { Component, input, output, booleanAttribute } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Tooltip } from '../../../../shared/components/overlay/tooltip/tooltip';
import { Icon } from '../../../../shared/components/icon/icon';
import { Flex } from '../../../../shared/components/layout/flex/flex';

/***** Import de types *****/
import { LucideIconName } from '../../../../shared/types/common.types';

@Component({
  selector: 'app-sidebar-item',
  imports: [Tooltip, Icon, Flex, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.scss',
})
export class SidebarItem {
  /***** Inputs *****/
  label = input<string>('');
  iconName = input<LucideIconName | null>(null);
  expanded = input<boolean, any>(true, { transform: booleanAttribute });
  routerLink = input<string | null>(null);

  /***** Outputs *****/
  clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
