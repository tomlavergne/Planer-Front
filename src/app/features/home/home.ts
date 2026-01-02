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
} from '../../shared/components';
import type { SelectOption, RadioOption, TabItem, ContextMenuItem } from '../../shared/components';

@Component({
  selector: 'app-home',
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
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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

  /***** Options pour Select *****/
  languageOptions: SelectOption[] = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
  ];

  /***** Options pour Radio Group *****/
  sizeOptions: RadioOption[] = [
    { value: 'sm', label: 'Petit' },
    { value: 'md', label: 'Moyen' },
    { value: 'lg', label: 'Grand' },
  ];

  /***** Tabs *****/
  tabs: TabItem[] = [
    { id: 'overview', label: "Vue d'ensemble" },
    { id: 'forms', label: 'Formulaires' },
    { id: 'feedback', label: 'Feedback' },
  ];

  /***** Progress *****/
  progress = signal(65);

  /***** Alert visible *****/
  showAlert = signal(true);

  /***** Context Menu Items *****/
  contextMenuItems: ContextMenuItem[] = [
    { id: 'copy', label: 'Copier', icon: 'lucideCopy' },
    { id: 'cut', label: 'Couper', icon: 'lucideScissors' },
    { id: 'paste', label: 'Coller', icon: 'lucideClipboard' },
    { id: 'separator1', label: '', separator: true },
    { id: 'delete', label: 'Supprimer', icon: 'lucideTrash', disabled: false },
    { id: 'separator2', label: '', separator: true },
    {
      id: 'share',
      label: 'Partager',
      icon: 'lucideShare2',
      submenu: [
        { id: 'email', label: 'Par email', icon: 'lucideMail' },
        { id: 'link', label: 'Copier le lien', icon: 'lucideLink' },
        {
          id: 'social',
          label: 'Réseaux sociaux',
          icon: 'lucideShare',
          submenu: [
            { id: 'facebook', label: 'Facebook', icon: 'lucideShare2' },
            { id: 'twitter', label: 'Twitter', icon: 'lucideShare2' },
            { id: 'linkedin', label: 'LinkedIn', icon: 'lucideShare2' },
            { id: 'separator-social', label: '', separator: true },
            {
              id: 'more-platforms',
              label: 'Plus de plateformes',
              icon: 'lucideMoreHorizontal',
              submenu: [
                { id: 'instagram', label: 'Instagram', icon: 'lucideShare2' },
                { id: 'tiktok', label: 'TikTok', icon: 'lucideShare2' },
                { id: 'youtube', label: 'YouTube', icon: 'lucideShare2' },
              ],
            },
          ],
        },
      ],
    },
    { id: 'properties', label: 'Propriétés', icon: 'lucideInfo' },
  ];

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
