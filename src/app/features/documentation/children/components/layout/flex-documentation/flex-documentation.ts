/***** Imports Angular *****/
import { Component, signal } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Alert, Text } from '../../../../../../shared/components';

/***** Import de types *****/
import { Alert as AlertType } from '../../../../../../shared/components/feedback/alert/alert.type';

@Component({
  selector: 'app-flex-documentation',
  imports: [DocumentationTemplate, Flex, Text],
  templateUrl: './flex-documentation.html',
  styleUrl: './flex-documentation.scss',
})
export class FlexDocumentation {
  readonly items = Array(5);
}
