/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Grid, Text, Card } from '../../..';

@Component({
  selector: 'app-grid-doc',
  imports: [Flex, Text, Grid, DocumentationTemplate],
  templateUrl: './grid.doc.html',
  styleUrl: './grid.doc.scss',
})
export class GridDoc {
  readonly gridItems3 = Array(6);
  readonly gridItems4 = Array(8);
  readonly gridItems6 = Array(12);
}
