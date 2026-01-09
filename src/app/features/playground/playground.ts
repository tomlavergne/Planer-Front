import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports des composants *****/
import {
  Ripple,
  Button,
  Toggle,
  Badge,
  Alert,
  Flex,
  Text,
  Accordion,
  ContextMenu,
} from '../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '../../shared/directives/popover/popover';
import { ClickOutsideDirective } from '../../shared/directives/click-outside/click-outside';

/***** Imports de types *****/
import type { AdvancedPosition, Color, Position } from '../../shared/types';
import type { Accordion as AccordionType } from '../../shared/components/display/accordion/accordion.type';
import type { Button as ButtonType } from '../../shared/components/forms/button/button.type';
import type { Toggle as ToggleType } from '../../shared/components/forms/toggle/toggle.type';
import type { Badge as BadgeType } from '../../shared/components/display/badge/badge.type';
import type { Alert as AlertType } from '../../shared/components/feedback/alert/alert.type';
import type { Text as TextType } from '../../shared/components/display/text/text.type';
import type { ContextMenu as ContextMenuType } from '../../shared/components/overlay/context-menu/context-menu.type';

@Component({
  selector: 'app-playground',
  imports: [
    CommonModule,
    Ripple,
    Accordion,
    Button,
    Toggle,
    ContextMenu,
    Badge,
    Alert,
    Flex,
    Text,
    TooltipDirective,
    PopoverDirective,
    ClickOutsideDirective,
  ],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
})
export class Playground {
  colors: Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];

  /***** Accordions *****/
  accordionVariants: AccordionType.Variant[] = ['soft', 'ghost'];

  /***** Textes *****/
  textVariants: TextType.Variant[] = ['body', 'caption', 'heading', 'label'];
  textSizes: TextType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  textWeights: TextType.Weight[] = ['light', 'normal', 'medium', 'semibold', 'bold'];
  textAligns: TextType.Align[] = ['left', 'center', 'right', 'justify'];
  textAs: TextType.As[] = [
    'p',
    'span',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'label',
    'small',
  ];

  /***** Button *****/
  buttonVariants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];
  buttonSizes: ButtonType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

  /***** Switch *****/
  switchVariants: ToggleType.Variant[] = ['solid', 'soft'];
  switchSizes: ToggleType.Size[] = ['sm', 'md', 'lg', 'xl'];

  /***** Tooltips *****/
  tooltipPositions: Position[] = ['top', 'right', 'bottom', 'left'];

  /***** Popovers *****/
  popoverPositions: AdvancedPosition[] = [
    'bottom',
    'bottom-left',
    'bottom-right',
    'top',
    'top-left',
    'top-right',
    'left',
    'left-top',
    'left-bottom',
    'right',
    'right-top',
    'right-bottom',
  ];

  @ViewChild('contextMenu') contextMenu!: ContextMenu;

  ngAfterViewInit(): void {
    console.log('ContextMenu ref:', this.contextMenu);
  }

  /***** ContextMenu *****/
  contextMenuVisible = signal(false);
  contextMenuPosition = signal({ x: 0, y: 0 });

  contextMenuItems = signal<ContextMenuType.Item[]>([
    {
      label: 'Nouveau',
      icon: 'lucidePlus',
      subItems: [
        { label: 'Fichier', icon: 'lucideFile' },
        { label: 'Dossier', icon: 'lucideFolder' },
        {
          label: 'Projet',
          icon: 'lucideFolderGit',
          subItems: [
            { label: 'React', icon: 'lucideFileCode' },
            { label: 'Angular', icon: 'lucideFileCode' },
            { label: 'Vue', icon: 'lucideFileCode' },
          ],
        },
      ],
    },
    {
      label: 'Ouvrir',
      icon: 'lucideFolderOpen',
    },
    {
      label: 'Éditer',
      icon: 'lucideEdit',
      subItems: [
        { label: 'Copier', icon: 'lucideCopy' },
        { label: 'Coller', icon: 'lucideClipboard' },
        { label: 'Couper', icon: 'lucideScissors' },
      ],
    },
    {
      label: 'Supprimer',
      icon: 'lucideTrash',
      color: 'red',
    },
  ]);

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuPosition.set({ x: event.clientX, y: event.clientY });
    this.contextMenuVisible.set(true);
  }

  onMenuItemClick(item: ContextMenuType.Item): void {
    console.log('Menu item clicked:', item);
    this.contextMenuVisible.set(false);
  }

  /***** Badge *****/
  badgeVariants: BadgeType.Variant[] = ['solid', 'soft', 'outline'];
  badgeSizes: BadgeType.Size[] = ['xs', 'sm', 'md', 'lg'];

  /***** Alert  *****/
  alertVariants: AlertType.Variant[] = ['solid', 'soft', 'outline'];

  showAlert = signal(true);
  isChecked = signal(false);

  /***** Méthodes *****/

  dismissAlert(): void {
    this.showAlert.set(false);
  }

  handleContextMenuAction(actionId: string): void {
    console.log('Context menu action:', actionId);
    alert(`Action sélectionnée: ${actionId}`);
  }
}
