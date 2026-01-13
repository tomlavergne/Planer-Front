/***** Imports Angular *****/
import { Component, input } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Accordion } from '../../../../shared/components';
import { SidebarItem } from '../../../../core/layout/sidebar/childrens/sidebar-item/sidebar-item';

/***** Import de types *****/
import type { Documentation as DocumentationType } from '../../documentation.type';

@Component({
  selector: 'app-documentation-index-item',
  imports: [Flex, Accordion, SidebarItem],
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
