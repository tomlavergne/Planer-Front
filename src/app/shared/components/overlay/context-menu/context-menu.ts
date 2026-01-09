/***** Imports de Angular *****/
import { Component, input, output, viewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Button } from '../../forms/button/button';
import { Icon } from '../../display/icon/icon';

/***** Import de directives *****/
import { PopoverDirective } from '../../../directives/popover/popover';

/***** Imports de types *****/
import type { ContextMenu as ContextMenuType } from './context-menu.type';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule, Flex, Button, Icon, PopoverDirective],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
  /***** Inputs *****/
  items = input.required<ContextMenuType.Item[]>();

  /***** Outputs *****/
  itemClicked = output<ContextMenuType.Item>();

  /***** Template Reference *****/
  submenuTemplate = viewChild<TemplateRef<any>>('submenuTemplate');

  onItemClick(item: ContextMenuType.Item): void {
    if (item.disabled || item.subItems) return;
    this.itemClicked.emit(item);
  }
}
