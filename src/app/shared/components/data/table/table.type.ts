export namespace Table {
  export interface Column<T> {
    id: string;
    header: string;
    accessor: keyof T | ((row: T) => any);
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    resizable?: boolean;
    sortable?: boolean;
    visible?: boolean;
    align?: 'left' | 'center' | 'right';
  }

  export interface Config<T> {
    columns: Column<T>[];
    data: T[];
    sortable?: boolean;
    resizable?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    selectable?: boolean;
  }

  export interface SortState {
    columnId: string;
    direction: 'asc' | 'desc' | null;
  }

  export interface ColumnResizeState {
    columnId: string;
    width: number;
  }

  export interface RowClickEvent<T> {
    row: T;
    index: number;
  }

  export interface ColumnResizeEvent {
    columnId: string;
    width: number;
  }
}
