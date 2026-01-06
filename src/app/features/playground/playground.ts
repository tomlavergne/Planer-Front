import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports des composants *****/
import { Button, Toggle, Badge, Alert, Flex, Text, Accordion } from '../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '../../shared/directives/popover/popover';

/***** Imports de types *****/
import type { AdvancedPosition, Color, Position } from '../../shared/types';
import type { Button as ButtonType } from '../../shared/components/forms/button/button.type';
import type { Toggle as ToggleType } from '../../shared/components/forms/toggle/toggle.type';
import type { Badge as BadgeType } from '../../shared/components/display/badge/badge.type';
import type { Alert as AlertType } from '../../shared/components/feedback/alert/alert.type';
import type { Text as TextType } from '../../shared/components/display/text/text.type';

@Component({
  selector: 'app-playground',
  imports: [
    CommonModule,
    Accordion,
    Button,
    Toggle,
    Badge,
    Alert,
    Flex,
    Text,
    TooltipDirective,
    PopoverDirective,
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
