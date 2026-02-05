/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Card, Text, Code, Select } from '../../..';
import { DocumentationTemplate, Preview } from '@features/documentation/';

@Component({
  imports: [Flex, Card, Text, Code, DocumentationTemplate, Preview, Select],
  templateUrl: './select.doc.html',
})
export class SelectDoc {}
