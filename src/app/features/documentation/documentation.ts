import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

/***** Imports des composants *****/
import { Flex, Text, Accordion } from '../../shared/components';
import { SidebarItem } from '../../core/layout/sidebar/childrens/sidebar-item/sidebar-item';

@Component({
  selector: 'app-documentation',
  imports: [CommonModule, RouterOutlet, Accordion, SidebarItem, Flex, Text],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {}
