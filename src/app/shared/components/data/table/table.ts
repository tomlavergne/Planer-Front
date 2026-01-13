/***** Imports Angular *****/
import { Component, input, output, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import { Table as TableType } from './table.type';
import type { Icon as IconType } from '../../display/icon/icon.type';

@Component({
  selector: 'app-table',
  imports: [CommonModule, Icon],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Table<T = any> {
  /***** Inputs *****/
  columns = input.required<TableType.Column<T>[]>();
  data = input.required<T[]>();
  striped = input<boolean>(false);
  hoverable = input<boolean>(true);
  sortable = input<boolean>(true);
  resizable = input<boolean>(true);
  selectable = input<boolean>(false);

  /***** Outputs *****/
  rowClick = output<TableType.RowClickEvent<T>>();
  columnResize = output<TableType.ColumnResizeEvent>();
  sortChange = output<TableType.SortState>();

  /***** Signals *****/
  sortState = signal<TableType.SortState>({ columnId: '', direction: null });
  columnWidths = signal<Map<string, number>>(new Map());
  resizingColumn = signal<string | null>(null);
  visibleColumns = signal<Set<string>>(new Set());

  /***** Computed *****/
  hostClasses = computed(() => {
    return [
      this.striped() ? 'striped' : '',
      this.hoverable() ? 'hoverable' : '',
      this.selectable() ? 'selectable' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  // Colonnes filtrées (visibles uniquement)
  displayedColumns = computed(() => {
    const visible = this.visibleColumns();
    return this.columns().filter((col) => visible.has(col.id));
  });

  // Données triées
  sortedData = computed(() => {
    const sort = this.sortState();
    const data = [...this.data()];

    if (!sort.columnId || !sort.direction) {
      return data;
    }

    const column = this.columns().find((col) => col.id === sort.columnId);
    if (!column) return data;

    return data.sort((a, b) => {
      const aValue = this.getCellValue(a, column);
      const bValue = this.getCellValue(b, column);

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  });

  constructor() {
    // Initialiser toutes les colonnes comme visibles
    effect(() => {
      const visible = new Set(this.columns().map((col) => col.id));
      this.visibleColumns.set(visible);
    });

    // Initialiser les largeurs des colonnes
    effect(() => {
      const widths = new Map<string, number>();
      this.columns().forEach((col) => {
        if (col.width) {
          widths.set(col.id, col.width);
        }
      });
      this.columnWidths.set(widths);
    });
  }

  /***** Methods *****/

  // Obtenir la valeur d'une cellule
  getCellValue(row: T, column: TableType.Column<T>): any {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor as keyof T];
  }

  // Gérer le tri
  onSort(columnId: string): void {
    if (!this.sortable()) return;

    const column = this.columns().find((col) => col.id === columnId);
    if (!column?.sortable) return;

    const currentSort = this.sortState();
    let newDirection: 'asc' | 'desc' | null = 'asc';

    if (currentSort.columnId === columnId) {
      if (currentSort.direction === 'asc') {
        newDirection = 'desc';
      } else if (currentSort.direction === 'desc') {
        newDirection = null;
      }
    }

    const newSort: TableType.SortState = {
      columnId: newDirection ? columnId : '',
      direction: newDirection,
    };

    this.sortState.set(newSort);
    this.sortChange.emit(newSort);
  }

  // Obtenir l'icône de tri
  getSortIcon(columnId: string): IconType.Name | null {
    const sort = this.sortState();
    if (sort.columnId !== columnId || !sort.direction) return null;
    return sort.direction === 'asc' ? 'lucideChevronUp' : 'lucideChevronDown';
  }

  // Gérer le clic sur une ligne
  onRowClick(row: T, index: number): void {
    if (!this.selectable()) return;
    this.rowClick.emit({ row, index });
  }

  // Commencer le redimensionnement
  startResize(event: MouseEvent, columnId: string): void {
    if (!this.resizable()) return;

    event.preventDefault();
    event.stopPropagation();

    this.resizingColumn.set(columnId);

    const column = this.columns().find((col) => col.id === columnId);
    if (!column) return;

    const startX = event.clientX;
    const startWidth = this.columnWidths().get(columnId) || column.width || 150;

    const onMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      let newWidth = startWidth + diff;

      // Appliquer les contraintes min/max
      if (column.minWidth) newWidth = Math.max(newWidth, column.minWidth);
      if (column.maxWidth) newWidth = Math.min(newWidth, column.maxWidth);

      const widths = new Map(this.columnWidths());
      widths.set(columnId, newWidth);
      this.columnWidths.set(widths);
    };

    const onMouseUp = () => {
      this.resizingColumn.set(null);
      const finalWidth = this.columnWidths().get(columnId);
      if (finalWidth) {
        this.columnResize.emit({ columnId, width: finalWidth });
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Obtenir le style de largeur d'une colonne
  getColumnWidth(columnId: string): string | undefined {
    const width = this.columnWidths().get(columnId);
    return width ? `${width}px` : undefined;
  }

  // Toggle visibilité d'une colonne
  toggleColumnVisibility(columnId: string): void {
    const visible = new Set(this.visibleColumns());
    if (visible.has(columnId)) {
      visible.delete(columnId);
    } else {
      visible.add(columnId);
    }
    this.visibleColumns.set(visible);
  }

  // Vérifier si une colonne est visible
  isColumnVisible(columnId: string): boolean {
    return this.visibleColumns().has(columnId);
  }
}
