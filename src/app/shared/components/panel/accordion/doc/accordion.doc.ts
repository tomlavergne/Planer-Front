/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';

import { Accordion, Flex, Text } from '../../..';

/***** Imports de types *****/
import type { Accordion as AccordionType } from '../accordion.type';

@Component({
  selector: 'app-accordion-doc',
  imports: [DocumentationTemplate, Flex, Text, Accordion],
  templateUrl: './accordion.doc.html',
})
export class AccordionDoc {
  /***** Accordions *****/
  accordionVariants: AccordionType.Variant[] = ['soft', 'ghost'];
}
