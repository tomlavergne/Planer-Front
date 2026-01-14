/***** Imports Angular *****/
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports des composants *****/
import { Flex, Accordion, Button } from '../../../../shared/components';

/***** Import de types *****/
import type { Documentation as DocumentationType } from '../../documentation.type';

@Component({
  selector: 'app-documentation-index-item',
  imports: [Flex, Accordion, Button, RouterLink, RouterLinkActive],
  templateUrl: './documentation-index-item.html',
})
export class DocumentationIndexItem {
  /***** Inputs *****/
  item = input.required<DocumentationType.Item | DocumentationType.Section>();

  /***** Methods *****/

  // Vérifier si l'item est une section (a du contenu)
  isSection(
    item: DocumentationType.Item | DocumentationType.Section,
  ): item is DocumentationType.Section {
    return 'content' in item && Array.isArray(item.content);
  }

  // Vérifier si l'item est un lien (a un path)
  isItem(item: DocumentationType.Item | DocumentationType.Section): item is DocumentationType.Item {
    return 'path' in item;
  }
}
