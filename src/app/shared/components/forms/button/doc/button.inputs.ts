/**
 * Ce fichier est généré automatiquement par scripts/generate-inputs-docs.ts
 * Ne pas modifier manuellement - Exécutez 'npm run generate:docs' pour regénérer
 */

export const COMPONENT_INPUTS_METADATA = [
  {
    "name": "text",
    "type": "string | null",
    "default": "null",
    "description": "Texte affiché dans le bouton"
  },
  {
    "name": "type",
    "type": "ButtonType.Type",
    "default": "'button'",
    "description": "Type HTML du bouton"
  },
  {
    "name": "variant",
    "type": "ButtonType.Variant",
    "default": "'solid'",
    "description": "Variant visuel du bouton"
  },
  {
    "name": "color",
    "type": "Color | null",
    "default": "'blue'",
    "description": "Couleur du bouton"
  },
  {
    "name": "disabled",
    "type": "boolean, any",
    "default": "false",
    "description": "Désactive le bouton"
  },
  {
    "name": "iconLeft",
    "type": "IconType.Name | null",
    "default": "null",
    "description": "Icône à gauche du texte"
  },
  {
    "name": "iconRight",
    "type": "IconType.Name | null",
    "default": "null",
    "description": "Icône à droite du texte"
  },
  {
    "name": "size",
    "type": "ButtonType.Size",
    "default": "'md'",
    "description": "Taille du bouton"
  },
  {
    "name": "borderRadius",
    "type": "ButtonType.BorderRadius",
    "default": "'md'",
    "description": "Rayon des bordures"
  },
  {
    "name": "fullWidth",
    "type": "boolean, any",
    "default": "false",
    "description": "Bouton prend toute la largeur"
  },
  {
    "name": "popo",
    "type": "boolean, any",
    "default": "false",
    "description": "Active le style popo"
  }
] as const;

export const COMPONENT_OUTPUTS_METADATA = [
  {
    "name": "clicked",
    "type": "MouseEvent",
    "description": "Émis lors du clic sur le bouton"
  },
  {
    "name": "testOutput",
    "type": "void",
    "description": "Test"
  }
] as const;
