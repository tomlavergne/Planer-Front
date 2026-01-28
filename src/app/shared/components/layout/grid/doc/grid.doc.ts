/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Grid, Text, Card } from '../../..';

/***** Import de types *****/
import type { Grid as GridType } from '../grid.type';
import type { Documentation as DocumentationType } from '@features/documentation/documentation.type';

@Component({
  selector: 'app-grid-doc',
  imports: [Flex, Text, Grid, DocumentationTemplate],
  templateUrl: './grid.doc.html',
  styleUrl: './grid.doc.scss',
})
export class GridDoc {
  readonly gridItems3 = Array(6);
  readonly gridItems4 = Array(8);
  readonly gridItems6 = Array(12);

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'display',
      default: 'flex' as GridType.Display | null,
      type: ['grid', 'inline-grid', 'none'],
      description: "Définit le type d'affichage du conteneur grid",
    },
    {
      name: 'columns',
      default: null as number | null,
      type: 'number',
      description: 'Définit le nombre de colonnes dans la grille',
    },
    {
      name: 'rows',
      default: null as number | null,
      type: 'number',
      description: 'Définit le nombre de lignes dans la grille',
    },
    {
      name: 'alignItems',
      default: 'stretch' as GridType.AlignItems | null,
      type: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: "Définit l'alignement des éléments enfants sur l'axe vertical",
    },
    {
      name: 'justifyItems',
      default: 'stretch' as GridType.JustifyItems | null,
      type: ['start', 'center', 'end', 'stretch'],
      description: "Définit l'alignement des éléments enfants sur l'axe horizontal",
    },
    {
      name: 'alignContent',
      default: 'start' as GridType.AlignContent | null,
      type: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
      description: "Définit l'alignement du contenu de la grille sur l'axe vertical",
    },
    {
      name: 'justifyContent',
      default: 'start' as GridType.JustifyContent | null,
      type: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
      description: "Définit l'alignement du contenu de la grille sur l'axe horizontal",
    },
    {
      name: 'gap',
      default: 'none' as GridType.Gap | null,
      type: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: "Définit l'espacement entre les éléments de la grille",
    },
    {
      name: 'rowGap',
      default: null as GridType.RowGap | null,
      type: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: "Définit l'espacement entre les lignes de la grille",
    },
    {
      name: 'columnGap',
      default: null as GridType.ColumnGap | null,
      type: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: "Définit l'espacement entre les colonnes de la grille",
    },
    {
      name: 'padding',
      default: 'none' as GridType.Padding | null,
      type: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Définit le padding interne du conteneur grid',
    },
    {
      name: 'autoFlow',
      default: 'row' as GridType.AutoFlow | null,
      type: ['row', 'column', 'dense', 'row dense', 'column dense'],
      description: 'Définit le flux automatique des éléments dans la grille',
    },
    {
      name: 'fullWidth',
      default: false,
      type: 'boolean',
      description: "Permet au conteneur grid d'occuper toute la largeur disponible",
    },
    {
      name: 'fullHeight',
      default: false,
      type: 'boolean',
      description: "Permet au conteneur grid d'occuper toute la hauteur disponible",
    },
  ];
}
