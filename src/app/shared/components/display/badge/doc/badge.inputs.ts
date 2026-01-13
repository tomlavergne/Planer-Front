/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

export const COMPONENT_INPUTS_METADATA = [
  {
    "name": "text",
    "type": "string",
    "default": "''",
    "description": ""
  },
  {
    "name": "variant",
    "type": "BadgeType.Variant",
    "default": "'solid'",
    "description": ""
  },
  {
    "name": "color",
    "type": "BadgeType.Color | null",
    "default": "'blue'",
    "description": ""
  },
  {
    "name": "icon",
    "type": "{\n    name: IconType.Name;\n    position?: BadgeType.IconPosition;\n  } | null",
    "default": "null",
    "description": ""
  },
  {
    "name": "size",
    "type": "BadgeType.Size",
    "default": "'md'",
    "description": ""
  }
] as const;


