/***** Imports Angular *****/
import { Component, signal } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Alert, Text } from '../../../';

/***** Import de types *****/
import { Alert as AlertType } from '../alert.type';

@Component({
  selector: 'app-alert-doc',
  imports: [DocumentationTemplate, Flex, Alert, Text],
  templateUrl: './alert.doc.html',
})
export class AlertDoc {
  /***** Alert  *****/
  colors: AlertType.Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];
  variants: AlertType.Variant[] = ['solid', 'soft', 'outline'];

  showAlert = signal(true);
  isChecked = signal(false);

  dismissAlert(): void {
    this.showAlert.set(false);
  }
}
