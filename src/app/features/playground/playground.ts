import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports des composants *****/
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Toggle,
  Select,
  RadioGroup,
  Badge,
  Card,
  Separator,
  Avatar,
  Dialog,
  Tabs,
  Progress,
  Alert,
  Skeleton,
  Flex,
  ContextMenu,
  Icon,
  Text,
  Accordion,
} from '../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../shared/directives/tooltip/tooltip';

/***** Imports de types *****/
import type { Color, Position } from '../../shared/types';
import type { Button as ButtonType } from '../../shared/components/forms/button/button.type';
import type { Toggle as ToggleType } from '../../shared/components/forms/toggle/toggle.type';
import type { Badge as BadgeType } from '../../shared/components/display/badge/badge.type';
import type { Alert as AlertType } from '../../shared/components/feedback/alert/alert.type';

@Component({
  selector: 'app-playground',
  imports: [
    CommonModule,
    Accordion,
    Button,
    Input,
    Textarea,
    Label,
    Checkbox,
    Toggle,
    Select,
    RadioGroup,
    Badge,
    Card,
    Separator,
    Avatar,
    Dialog,
    Tabs,
    Progress,
    Alert,
    Skeleton,
    Flex,
    ContextMenu,
    Icon,
    Text,
    TooltipDirective,
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

  /***** Progress *****/

  /***** Button *****/
  buttonVariants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];
  buttonSizes: ButtonType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

  /***** Switch *****/
  switchVariants: ToggleType.Variant[] = ['solid', 'soft'];
  switchSizes: ToggleType.Size[] = ['sm', 'md', 'lg', 'xl'];

  /***** Tooltips *****/
  tooltipPositions: Position[] = ['top', 'right', 'bottom', 'left'];

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
