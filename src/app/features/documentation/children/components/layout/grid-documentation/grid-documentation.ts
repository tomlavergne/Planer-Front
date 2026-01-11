/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Grid, Text, Card } from '../../../../../../shared/components';

@Component({
  selector: 'app-grid-documentation',
  imports: [Flex, Text, Grid, DocumentationTemplate],
  templateUrl: './grid-documentation.html',
  styleUrl: './grid-documentation.scss',
})
export class GridDocumentation {
  readonly gridItems3 = Array(6);
  readonly gridItems4 = Array(8);
  readonly gridItems6 = Array(12);
}
