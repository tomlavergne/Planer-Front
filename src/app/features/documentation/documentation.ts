import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports des composants *****/
import { Flex, Text, Button } from '../../shared/components';

/***** Import de types *****/
import type { Documentation as DocumentationType } from './documentation.type';

import { DOCUMENTED_COMPONENTS } from './documentation.config';

@Component({
  selector: 'app-documentation',
  imports: [CommonModule, RouterOutlet, Flex, Text, Button, RouterLink, RouterLinkActive],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class Documentation {
  indexConfiguration: DocumentationType.Index = DOCUMENTED_COMPONENTS;
}
