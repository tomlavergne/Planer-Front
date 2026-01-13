/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

export const COMPONENT_INPUTS_METADATA = [
  {
    "name": "variant",
    "type": "AlertType.Variant",
    "default": "'solid'",
    "description": ""
  },
  {
    "name": "color",
    "type": "AlertType.Color | null",
    "default": "null",
    "description": ""
  },
  {
    "name": "icon",
    "type": "Toggle.Name | null",
    "default": "null",
    "description": ""
  },
  {
    "name": "title",
    "type": "string | null",
    "default": "null",
    "description": ""
  },
  {
    "name": "message",
    "type": "string | null",
    "default": "null",
    "description": ""
  },
  {
    "name": "button",
    "type": "{\n    text: string;\n    icon?: {\n      name: Toggle.Name;\n      position?: ButtonType.IconPosition;\n    } | null;\n    callback: () =",
    "default": "undefined",
    "description": ""
  },
  {
    "name": "borderRadius",
    "type": "ButtonType.BorderRadius",
    "default": "'md'",
    "description": ""
  },
  {
    "name": "dismissible",
    "type": "boolean, any",
    "default": "false",
    "description": ""
  }
] as const;

export const COMPONENT_OUTPUTS_METADATA = [
  {
    "name": "dismissed",
    "type": "void",
    "description": ""
  }
] as const;
