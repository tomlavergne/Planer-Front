/***** Imports de Angular *****/
import { Component, input, output, booleanAttribute } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Flex } from '../../../../shared/components/layout/flex/flex';
import { Icon } from '../../../../shared/components/display/icon/icon';
import { Text } from '../../../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import type { Icon as IconType } from '../../../../shared/components/display/icon/icon.type';

@Component({
  selector: 'app-sidebar-item',
  imports: [Flex, Icon, Text, RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.scss',
})
export class SidebarItem {
  /******************/
  /***** Inputs *****/
  /******************/

  label = input<string>('');
  iconName = input<IconType.Name | null>(null);
  expanded = input<boolean, any>(true, { transform: booleanAttribute });
  routerLink = input<string | null>(null);

  /*******************/
  /***** Outputs *****/
  /*******************/

  clicked = output<void>();

  /*******************/
  /***** Methods *****/
  /*******************/

  onClick(): void {
    this.clicked.emit();
  }
}
