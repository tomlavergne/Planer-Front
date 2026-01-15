import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/***** Imports des composants *****/
import { Flex } from '../../shared/components';
import { DocumentationIndexItem } from './children/documentation-index-item/documentation-index-item';

/***** Import de types *****/
import type { Documentation as DocumentationType } from './documentation.type';

@Component({
  selector: 'app-documentation',
  imports: [CommonModule, RouterOutlet, Flex, DocumentationIndexItem],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {
  index: DocumentationType.Index = [
    {
      title: 'Composants',
      content: [
        {
          title: 'Layout',
          content: [
            { title: 'Flex', path: 'flex', icon: 'lucideAlignHorizontalJustifyStart' },
            { title: 'Grid', path: 'grid', icon: 'lucideGrid2X2' },
          ],
        },
        {
          title: 'Panel',
          content: [
            { title: 'Card', path: 'card', icon: 'lucideSquare' },
            { title: 'Accordion', path: 'accordion', icon: 'lucideListChevronsDownUp' },
          ],
        },
        {
          title: 'Display',
          content: [
            { title: 'Text', path: 'text', icon: 'lucideType' },
            { title: 'Icon', path: 'icon', icon: 'lucideStar' },
            { title: 'Avatar', path: 'avatar', icon: 'lucideUserCircle' },
            { title: 'Badge', path: 'badge', icon: 'lucideBadge' },
          ],
        },
        {
          title: 'Form',
          content: [
            { title: 'Button', path: 'button', icon: 'lucideSquare' },
            { title: 'toggle', path: 'toggle', icon: 'lucideToggleLeft' },
            { title: 'Input', path: 'input', icon: 'lucideSquare' },
            { title: 'Checkbox', path: 'checkbox', icon: 'lucideCheckSquare' },
            { title: 'Radio', path: 'radio', icon: 'lucideSquare' },
            { title: 'Select', path: 'select', icon: 'lucideSquare' },
          ],
        },
        {
          title: 'Data',
          content: [
            { title: 'Table', path: 'table', icon: 'lucideTable' },
            { title: 'Pagination', path: 'pagination', icon: 'lucideChevronsRightLeft' },
          ],
        },
        {
          title: 'Feedback',
          content: [
            { title: 'Alert', path: 'alert', icon: 'lucideAlertCircle' },
            { title: 'Spinner', path: 'spinner', icon: 'lucideLoader2' },
            { title: 'Toast', path: 'toast', icon: 'lucideBell' },
          ],
        },
        {
          title: 'Navigation',
          content: [
            { title: 'Breadcrumb', path: 'breadcrumb', icon: 'lucideHome' },
            { title: 'Tabs', path: 'tabs', icon: 'lucideSquare' },
          ],
        },
      ],
    },
    {
      title: 'Directives',
      content: [
        {
          title: 'Overlay',
          content: [
            { title: 'Tooltip', path: 'tooltip', icon: 'lucideSquare' },
            { title: 'Popover', path: 'popover', icon: 'lucideSquare' },
          ],
        },
      ],
    },
  ];
}
