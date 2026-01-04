import { Component, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports des composants *****/
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  Switch,
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
} from '../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../shared/directives/tooltip/tooltip';

/***** Imports de types *****/
import type {
  Color,
  Alert as AlertType,
  Button as ButtonType,
  Badge as BadgeType,
} from '../../shared/types';

@Component({
  selector: 'app-playground',
  imports: [
    CommonModule,
    Button,
    Input,
    Textarea,
    Label,
    Checkbox,
    Switch,
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
  /***** ViewChild pour le Dialog et ContextMenu *****/
  dialog = viewChild<Dialog>('demoDialog');
  contextMenu = viewChild<ContextMenu>('contextMenu');

  /***** Signals pour les formulaires *****/
  email = signal('');
  message = signal('');
  acceptTerms = signal(false);
  notifications = signal(true);
  language = signal<string | null>('fr');
  size = signal<string | null>('md');

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
  progress = signal(65);

  /***** Button *****/
  buttonVariants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];

  /***** Badge *****/
  badgeVariants: BadgeType.Variant[] = ['solid', 'soft', 'outline'];

  /***** Alert  *****/
  showAlert = signal(true);

  isChecked = signal(false);
  alertVariants: AlertType.Variant[] = ['solid', 'soft', 'outline'];

  /***** Méthodes *****/
  openDialog(): void {
    this.dialog()?.open();
  }

  closeDialog(): void {
    this.dialog()?.close();
  }

  handleSubmit(): void {
    console.log('Form submitted:', {
      email: this.email(),
      message: this.message(),
      acceptTerms: this.acceptTerms(),
      notifications: this.notifications(),
      language: this.language(),
      size: this.size(),
    });
    alert('Formulaire soumis ! (voir console)');
  }

  dismissAlert(): void {
    this.showAlert.set(false);
  }

  openContextMenu(event: MouseEvent): void {
    this.contextMenu()?.open(event);
  }

  handleContextMenuAction(actionId: string): void {
    console.log('Context menu action:', actionId);
    alert(`Action sélectionnée: ${actionId}`);
  }
}
