/***** Imorts Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Text } from '../../../';
import { DocumentationTemplate } from '@features/documentation/children/documentation-template/documentation-template';

/***** Import de types *****/
import type { Box as BoxType } from '../box.type';
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'app-box.doc',
  imports: [DocumentationTemplate, Flex, Text],
  templateUrl: './box.doc.html',
})
export class BoxDoc {
  inputsMetadata: DocumentationType.InputConfig[] = [];
}
