/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Text, Card } from '../../../../../../shared/components';

@Component({
  selector: 'app-card-documentation',
  imports: [Flex, Text, Card, DocumentationTemplate],
  templateUrl: './card-documentation.html',
  styleUrl: './card-documentation.scss',
})
export class CardDocumentation {}
