/***** Imports de Angular *****/
import { Component, input, booleanAttribute, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Button } from '../../../../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import type { Icon as IconType } from '../../../../../shared/components/display/icon/icon.type';
import type { Button as ButtonType } from '../../../../../shared/components/form/button/button.type';

@Component({
  selector: 'app-sidebar-item',
  imports: [Button, TooltipDirective],
  styleUrl: './sidebar-item.scss',
  templateUrl: './sidebar-item.html',
  host: {
    '[class.active]': 'isActive()',
    '(isActiveChange)': 'isActive.set($event)',
  },
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink: path'],
    },
    {
      directive: RouterLinkActive,
      outputs: ['isActiveChange'],
    },
  ],
})
export class SidebarItem {
  text = input.required<string>();
  icon = input<IconType.Name>();
  size = input<ButtonType.Size>('md');
  path = input.required<string>();
  expanded = input<boolean, any>(true, { transform: booleanAttribute });

  isActive = signal<boolean>(false);
}
