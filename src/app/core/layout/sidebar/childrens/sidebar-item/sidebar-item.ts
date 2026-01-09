/***** Imports de Angular *****/
import { Component, input, output, booleanAttribute } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Button } from '../../../../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import type { Icon as IconType } from '../../../../../shared/components/display/icon/icon.type';

@Component({
  selector: 'app-sidebar-item',
  imports: [Button, RouterLink, RouterLinkActive, TooltipDirective],
  template: `
    <a
      [routerLink]="routerLink()"
      routerLinkActive="active"
      #rla="routerLinkActive"
      (click)="onClick()"
      [tooltip]="{
        content: label(),
        position: 'right',
        delay: 500,
        disabled: expanded(),
      }"
    >
      <app-button
        [text]="expanded() ? label() : ''"
        [variant]="rla.isActive ? 'soft' : 'ghost'"
        [color]="rla.isActive ? 'blue' : 'gray'"
        size="sm"
        fullWidth
        [iconLeft]="iconName()"
        class="sidebar-item-button"
      />
    </a>
  `,
})
export class SidebarItem {
  /******************/
  /***** Inputs *****/
  /******************/

  label = input<string>('');
  iconName = input<IconType.Name | null>(null);
  expanded = input<boolean, any>(true, { transform: booleanAttribute });

  // Link path for routerLink
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
