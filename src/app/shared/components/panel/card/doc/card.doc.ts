/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Text, Card } from '../../..';

/***** Imports de types *****/
import type { Card as CardType } from '../card.type';

@Component({
  selector: 'app-card-doc',
  imports: [Flex, Text, Card, DocumentationTemplate],
  templateUrl: './card.doc.html',
})
export class CardDoc {
  cardVariants: CardType.Variant[] = ['soft', 'outline'];
}
