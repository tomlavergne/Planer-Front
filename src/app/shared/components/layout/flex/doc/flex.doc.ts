/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { DocumentationUsage } from '@features/documentation/children/documentation-usage/documentation-usage';
import { Flex, Text } from '../../..';

/***** Import de types *****/
import type { Flex as FlexType } from '../flex.type';
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'app-flex-doc',
  imports: [DocumentationTemplate, DocumentationUsage, Flex, Text],
  templateUrl: './flex.doc.html',
  styleUrl: './flex.doc.scss',
})
export class FlexDoc {
  readonly items = Array(5);

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'display',
      default: 'flex' as FlexType.Display | null,
      type: ['flex', 'inline-flex', 'none'],
      description: "Définit le type d'affichage du conteneur flex",
    },
    {
      name: 'direction',
      default: 'row' as FlexType.Direction | null,
      type: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Définit la direction des éléments enfants',
    },
    {
      name: 'justifyContent',
      default: 'start' as FlexType.Justify | null,
      type: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: "Définit l'alignement des éléments enfants sur l'axe principal",
    },
    {
      name: 'alignItems',
      default: 'stretch' as FlexType.Align | null,
      type: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: "Définit l'alignement des éléments enfants sur l'axe secondaire",
    },

    {
      name: 'gap',
      default: 'none' as FlexType.Gap | null,
      type: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: "Définit l'espacement entre les éléments enfants",
    },
    {
      name: 'padding',
      default: 'none' as FlexType.Padding | null,
      type: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Définit le padding interne du conteneur flex',
    },
    {
      name: 'fullWidth',
      default: false,
      type: 'boolean',
      description: "Permet au conteneur flex d'occuper toute la largeur disponible",
    },
    {
      name: 'fullHeight',
      default: false,
      type: 'boolean',
      description: "Permet au conteneur flex d'occuper toute la hauteur disponible",
    },
    {
      name: 'wrap',
      default: false,
      type: 'boolean',
      description: "Permet aux éléments enfants de passer à la ligne si l'espace manque",
    },
  ];
}
