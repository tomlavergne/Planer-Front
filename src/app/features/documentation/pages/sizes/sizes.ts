/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Text, Card, Table, Badge, TableColumnTemplate } from '@shared/components';
import { DocumentationTemplate } from '../../children/documentation-template/documentation-template';

/***** Imoprt de variables *****/
import { spacings, fontSizes, fontWeights, radii } from '@shared/variables/sizes';

/***** Import de types *****/
import type { Text as TextType } from '@shared/components/display/text/text.type';
import type { Table as TableType } from '@shared/components/data/table/table.type';

type SizeTableRow = {
  name: string;
  value: string;
};

type FontTableRow = {
  name: string;
  size: string;
  letterSpacing: string;
  lineHeight: string;
};

@Component({
  selector: 'app-sizes',
  imports: [Flex, Text, Card, Table, Badge, TableColumnTemplate, DocumentationTemplate],
  templateUrl: './sizes.html',
  styleUrl: './sizes.scss',
})
export class Sizes {
  spacings = spacings;
  radii = radii;
  fontSizes = fontSizes as TextType.Size[];
  fontWeights = fontWeights as TextType.Weight[];

  sizeColumns: TableType.Column<SizeTableRow>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'value', header: 'Valeur', accessor: 'value', sortable: true, width: 200 },
  ];

  spacingsData: SizeTableRow[] = [
    {
      name: '5xs',
      value: '1px',
    },
    {
      name: '4xs',
      value: '2px',
    },
    {
      name: '3xs',
      value: '4px',
    },
    {
      name: '2xs',
      value: '8px',
    },
    {
      name: 'xs',
      value: '12px',
    },
    {
      name: 'sm',
      value: '16px',
    },
    {
      name: 'md',
      value: '24px',
    },
    {
      name: 'lg',
      value: '32px',
    },
    {
      name: 'xl',
      value: '40px',
    },
    {
      name: '2xl',
      value: '48px',
    },
    {
      name: '3xl',
      value: '64px',
    },
  ];

  radiiData: SizeTableRow[] = [
    {
      name: 'none',
      value: '0px',
    },
    {
      name: '2xs',
      value: '1px',
    },
    {
      name: 'xs',
      value: '2px',
    },
    {
      name: 'sm',
      value: '4px',
    },
    {
      name: 'md',
      value: '6px',
    },
    {
      name: 'lg',
      value: '8px',
    },
    {
      name: 'xl',
      value: '12px',
    },
    {
      name: '2xl',
      value: '16px',
    },
    {
      name: 'full',
      value: '9999px',
    },
  ];

  fontColumns: TableType.Column<FontTableRow>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'size', header: 'Taille', accessor: 'size', sortable: true, width: 200 },
    {
      id: 'letterSpacing',
      header: 'letterSpacing',
      accessor: 'letterSpacing',
      sortable: true,
      width: 200,
    },
    { id: 'lineHeight', header: 'lineHeight', accessor: 'lineHeight', sortable: true, width: 200 },
  ];

  fontData: FontTableRow[] = [
    {
      name: 'xs',
      size: '12px',
      letterSpacing: '0.0025em',
      lineHeight: '16px',
    },
    {
      name: 'sm',
      size: '14px',
      letterSpacing: '0em',
      lineHeight: '20px',
    },
    {
      name: 'md',
      size: '16px',
      letterSpacing: '0em',
      lineHeight: '24px',
    },
    {
      name: 'lg',
      size: '18px',
      letterSpacing: '-0.0025em',
      lineHeight: '26px',
    },
    {
      name: 'xl',
      size: '20px',
      letterSpacing: '-0.005em',
      lineHeight: '28px',
    },
    {
      name: '2xl',
      size: '24px',
      letterSpacing: '-0.00625em',
      lineHeight: '30px',
    },
    {
      name: '3xl',
      size: '28px',
      letterSpacing: '-0.0075em',
      lineHeight: '36px',
    },
    {
      name: '4xl',
      size: '35px',
      letterSpacing: '-0.01em',
      lineHeight: '40px',
    },
    {
      name: '5xl',
      size: '60px',
      letterSpacing: '-0.025em',
      lineHeight: '60px',
    },
  ];

  fontWeightsData: SizeTableRow[] = [
    {
      name: 'thin',
      value: '200',
    },
    {
      name: 'light',
      value: '300',
    },
    {
      name: 'regular',
      value: '400',
    },
    {
      name: 'medium',
      value: '500',
    },
    {
      name: 'semibold',
      value: '600',
    },
    {
      name: 'bold',
      value: '700',
    },
  ];
}
