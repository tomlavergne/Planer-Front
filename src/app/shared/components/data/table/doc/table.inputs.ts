/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

export const COMPONENT_INPUTS_METADATA = [
  {
    "name": "striped",
    "type": "boolean",
    "default": "false",
    "description": ""
  },
  {
    "name": "hoverable",
    "type": "boolean",
    "default": "true",
    "description": ""
  },
  {
    "name": "sortable",
    "type": "boolean",
    "default": "true",
    "description": ""
  },
  {
    "name": "resizable",
    "type": "boolean",
    "default": "true",
    "description": ""
  },
  {
    "name": "selectable",
    "type": "boolean",
    "default": "false",
    "description": ""
  }
] as const;

export const COMPONENT_OUTPUTS_METADATA = [
  {
    "name": "rowClick",
    "type": "TableType.RowClickEvent<T",
    "description": "** Outputs"
  },
  {
    "name": "columnResize",
    "type": "TableType.ColumnResizeEvent",
    "description": ""
  },
  {
    "name": "sortChange",
    "type": "TableType.SortState",
    "description": ""
  }
] as const;
