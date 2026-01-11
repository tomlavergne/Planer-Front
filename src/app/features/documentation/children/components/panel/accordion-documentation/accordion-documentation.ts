/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';

import { Accordion, Flex, Text } from '../../../../../../shared/components';

/***** Imports de types *****/
import type { Accordion as AccordionType } from '../../../../../../shared/components/panel/accordion/accordion.type';

@Component({
  selector: 'app-accordion-documentation',
  imports: [DocumentationTemplate, Flex, Text, Accordion],
  templateUrl: './accordion-documentation.html',
  styleUrl: './accordion-documentation.scss',
})
export class AccordionDocumentation {
  /***** Accordions *****/
  accordionVariants: AccordionType.Variant[] = ['soft', 'ghost'];
}
