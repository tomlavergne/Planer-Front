/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Card, Text, Code } from '../../../..';
import { Preview } from '@features/documentation/children/preview/preview';
import { Toast } from '../toast';

/***** Import de types *****/
import { Documentation as DocumentationType } from '../../../../../../features/documentation/documentation.type';
import { Toast as ToastType } from '../toast.type';

/***** Import de variables *****/
import { semanticColors, primaryColors } from '@shared/variables/colors';
import { SemanticColor } from '@shared/types';

@Component({
  selector: 'app-toast.doc',
  imports: [DocumentationTemplate, Flex, Toast, Card, Text, Code, Preview],
  templateUrl: './toast.doc.html',
})
export class ToastDoc {
  semanticColors = semanticColors;
  primaryColors = primaryColors;

  callbackToast(): void {}

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'title',
      default: null as string | null,
      type: 'string | null',
      description: 'Titre du toast',
    },
    {
      name: 'message',
      default: null,
      type: 'string',
      description: 'Message du toast',
    },
    {
      name: 'color',
      default: 'primary' as ToastType.Config['color'],
      type: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Couleur du toast',
    },
    {
      name: 'icon',
      default: null as ToastType.Config['icon'] | null,
      type: 'string | null',
      description: 'Icône affichée dans le toast (par défaut en fonction de la couleur)',
    },
    {
      name: 'action',
      default: null as ToastType.Config['action'] | null,
      type: '{ label: string; callback: () => void; } | null',
      description: 'Action optionnelle affichée dans le toast',
    },
    {
      name: 'dismissible',
      default: false,
      type: 'boolean',
      description: "Indique si le toast peut être dismissible par l'utilisateur",
    },
    {
      name: 'isDismissing',
      default: false,
      type: 'boolean',
      description: 'Indique si le toast est en cours de dismissal (utilisé pour les animations)',
    },
  ];

  outputsMetadata: DocumentationType.OutputConfig[] = [
    {
      name: 'dismiss',
      type: 'void',
      description: 'Événement émis lorsque le toast est dismissé',
    },
  ];

  semanticColorsCodeExemple = `@for (color of semanticColors; track $index) {
    <app-toast
        [color]="color"
        [title]="'Toast de couleur ' + color"
        message="Ceci est un message de toast de couleur {{ color }}."
        [action]="{
            label: 'Action',
            callback: callbackToast,
        }"
        dismissible
    />
    @for (color of semanticColors; track $index) {
    <app-toast
        [color]="color"
        [title]="'Toast de couleur ' + color"
        message="Ceci est un message de toast de couleur {{ color }}."
        [action]="{
            label: 'Action',
            callback: callbackToast,
        }"
        dismissible
    />
    @for (color of semanticColors; track $index) {
    <app-toast
        [color]="color"
        [title]="'Toast de couleur ' + color"
        message="Ceci est un message de toast de couleur {{ color }}."
        [action]="{
            label: 'Action',
            callback: callbackToast,
        }"
        dismissible
    />
    @for (color of semanticColors; track $index) {
    <app-toast
        [color]="color"
        [title]="'Toast de couleur ' + color"
        message="Ceci est un message de toast de couleur {{ color }}."
        [action]="{
            label: 'Action',
            callback: callbackToast,
        }"
        dismissible
    />
}`;
}
