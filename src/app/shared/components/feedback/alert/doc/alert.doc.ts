/***** Imports Angular *****/
import { Component, signal } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Alert, Text, Card, Code } from '../../../';
import { Preview } from '@features/documentation/children/preview/preview';

/***** Import de types *****/
import { Alert as AlertType } from '../alert.type';

/***** Import de variables *****/
import { semanticColors, primaryColors } from '@shared/variables/colors';

@Component({
  selector: 'app-alert-doc',
  imports: [DocumentationTemplate, Flex, Alert, Text, Card, Code, Preview],
  templateUrl: './alert.doc.html',
})
export class AlertDoc {
  /***** Alert  *****/
  semanticColors = semanticColors;
  primaryColors = primaryColors;

  showAlert = signal(true);
  isChecked = signal(false);

  dismissAlert(): void {
    this.showAlert.set(false);
  }

  callbackAlert(): void {
    this.isChecked.set(!this.isChecked());
  }

  codeExample = `<app-alert
  color="success"
  title="Succès !"
  message="Votre action a été réalisée avec succès."
  icon="check-circle"
  [action]="{
    label: 'Voir les détails',
    callback: onDetailsClick
  }"
  [dismissible]="true"
  (isDismissing)="onDismiss()"
></app-alert>`;

  /***** Documentation *****/
}
