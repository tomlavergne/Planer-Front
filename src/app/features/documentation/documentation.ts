import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports des composants *****/
import { Flex, Text, Button } from '../../shared/components';
import { DocumentationSidebar } from './children/documentation-sidebar/documentation-sidebar';

@Component({
  selector: 'app-documentation',
  imports: [
    CommonModule,
    RouterOutlet,
    Flex,
    Text,
    Button,
    RouterLink,
    RouterLinkActive,
    DocumentationSidebar,
  ],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {}
