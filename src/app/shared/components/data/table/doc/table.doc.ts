/***** Import Angular *****/
import { Component, signal } from '@angular/core';

/***** Import de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Table, Text } from '../../..';

/***** Import de types *****/
import { Table as TableType } from '../table.type';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-table-doc',
  imports: [DocumentationTemplate, Flex, Table, Text],
  templateUrl: './table.doc.html',
})
export class TableDoc {
  // Données d'exemple
  users: User[] = [
    { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Actif' },
    { id: 2, name: 'Bob Dubois', email: 'bob@example.com', role: 'User', status: 'Actif' },
    {
      id: 3,
      name: 'Charlie Lefebvre',
      email: 'charlie@example.com',
      role: 'Manager',
      status: 'Inactif',
    },
    { id: 4, name: 'Diana Roux', email: 'diana@example.com', role: 'User', status: 'Actif' },
    { id: 5, name: 'Éric Lambert', email: 'eric@example.com', role: 'Admin', status: 'Actif' },
  ];

  // Configuration des colonnes - Table basique
  basicColumns: TableType.Column<User>[] = [
    { id: 'name', header: 'Nom', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Rôle', accessor: 'role' },
  ];

  // Configuration des colonnes - Table complète
  fullColumns: TableType.Column<User>[] = [
    { id: 'id', header: 'ID', accessor: 'id', width: 80, sortable: true, align: 'center' },
    { id: 'name', header: 'Nom', accessor: 'name', width: 200, sortable: true, minWidth: 150 },
    { id: 'email', header: 'Email', accessor: 'email', width: 250, sortable: true, minWidth: 200 },
    { id: 'role', header: 'Rôle', accessor: 'role', width: 150, sortable: true },
    {
      id: 'status',
      header: 'Statut',
      accessor: 'status',
      width: 120,
      sortable: true,
      align: 'center',
    },
  ];

  // Gestion des événements
  lastClickedRow = signal<string>('');

  onRowClick(event: TableType.RowClickEvent<User>): void {
    this.lastClickedRow.set(`Ligne ${event.index + 1}: ${event.row.name}`);
  }

  onColumnResize(event: TableType.ColumnResizeEvent): void {
    console.log(`Colonne ${event.columnId} redimensionnée à ${event.width}px`);
  }

  onSortChange(event: TableType.SortState): void {
    console.log(`Tri: ${event.columnId} ${event.direction}`);
  }
}
