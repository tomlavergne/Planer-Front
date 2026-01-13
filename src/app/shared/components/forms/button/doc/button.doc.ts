/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Button, Text, Table } from '../../../';

/***** Import de types *****/
import { Button as ButtonType } from '../button.type';
import type { Table as TableType } from '../../../data/table/table.type';

import { COMPONENT_INPUTS_METADATA, COMPONENT_OUTPUTS_METADATA } from './button.inputs';

@Component({
  selector: 'app-button-documentation',
  imports: [DocumentationTemplate, Flex, Button, Text, Table],
  templateUrl: './button.doc.html',
})
export class ButtonDoc {
  colors: ButtonType.Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];
  buttonVariants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];
  buttonSizes: ButtonType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

  // Propriétés du composant Button
  buttonPropertiesColumns: TableType.Column<any>[] = [
    { id: 'name', header: 'Propriété', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
    { id: 'description', header: 'Description', accessor: 'description', sortable: false },
  ];

  buttonOutputsColumns: TableType.Column<any>[] = [
    { id: 'name', header: 'Propriété', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'description', header: 'Description', accessor: 'description', sortable: false },
  ];

  // Auto-généré depuis button.ts via scripts/generate-inputs-docs.ts
  buttonInputsData = [...COMPONENT_INPUTS_METADATA];

  // Auto-généré depuis button.ts via scripts/generate-outputs-docs.ts
  buttonOutputsData = [...COMPONENT_OUTPUTS_METADATA];
}
