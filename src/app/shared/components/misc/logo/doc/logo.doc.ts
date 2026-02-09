import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Card, Text, Logo } from '../../..';
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Preview } from '@features/documentation/children/preview/preview';

// Import de types
import { Logo as LogoType } from '../logo.type';

/***** Import de directives *****/
import { TooltipDirective } from '@shared/directives/';

@Component({
  selector: 'app-logo-doc',
  imports: [Flex, DocumentationTemplate, Preview, Card, Text, Logo, TooltipDirective],
  templateUrl: './logo.doc.html',
})
export class LogoDoc {
  sizes: LogoType.Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];
}
