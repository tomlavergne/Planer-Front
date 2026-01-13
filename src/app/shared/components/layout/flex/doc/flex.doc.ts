/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Text } from '../../..';

/***** Import de types *****/
import { Flex as FlexType } from '../flex.type';

@Component({
  selector: 'app-flex-doc',
  imports: [DocumentationTemplate, Flex, Text],
  templateUrl: './flex.doc.html',
  styleUrl: './flex.doc.scss',
})
export class FlexDoc {
  readonly items = Array(5);
}
