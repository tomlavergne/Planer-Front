import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Button } from '../../forms/button/button';

/***** Import de directives *****/
// import { SubmenuDirective } from '../../../directives/submenu/submenu';
import { ClickOutsideDirective } from '../../../directives/click-outside/click-outside';

/***** Imports de types *****/
import type { ContextMenu as ContextMenuType } from './context-menu.type';

@Component({
  selector: 'app-context-menu-content',
  standalone: true,
  imports: [CommonModule, Flex, Button, ClickOutsideDirective],
  template: `
    <app-flex
      direction="column"
      padding="2xs"
      class="context-menu"
      [excludeSelector]="'.cdk-overlay-container'"
      (clickOutside)="clickedOutside.emit()"
    >
      @for (item of items(); track $index) {
        <div class="context-menu-item-wrapper">
          <app-button
            [text]="item.label"
            [variant]="'ghost'"
            [color]="item.color ?? 'gray'"
            size="sm"
            [iconLeft]="item.icon!"
            [iconRight]="item.subItems ? 'lucideChevronRight' : null"
            fullWidth
            (clicked)="itemClicked.emit(item)"
          />
        </div>
      }
    </app-flex>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .context-menu {
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        min-width: 150px;
        overflow: hidden;

        .context-menu-item-wrapper {
          position: relative;
        }
      }
    `,
  ],
})
export class ContextMenuContent {
  items = input.required<ContextMenuType.Item[]>();
  itemClicked = output<ContextMenuType.Item>();
  clickedOutside = output<void>();
}
