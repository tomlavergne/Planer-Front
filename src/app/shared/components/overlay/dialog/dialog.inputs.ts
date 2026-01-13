/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

export const COMPONENT_INPUTS_METADATA = [
  {
    "name": "title",
    "type": "string | null",
    "default": "null",
    "description": "** Inputs"
  },
  {
    "name": "size",
    "type": "Size",
    "default": "'md'",
    "description": ""
  },
  {
    "name": "closeOnBackdrop",
    "type": "boolean, any",
    "default": "true",
    "description": ""
  },
  {
    "name": "showCloseButton",
    "type": "boolean, any",
    "default": "true",
    "description": ""
  }
] as const;

export const COMPONENT_OUTPUTS_METADATA = [
  {
    "name": "closed",
    "type": "void",
    "description": "** Outputs"
  },
  {
    "name": "opened",
    "type": "void",
    "description": ""
  }
] as const;
