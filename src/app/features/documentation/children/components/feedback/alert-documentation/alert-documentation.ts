/***** Imports Angular *****/
import { Component, signal } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Alert, Text } from '../../../../../../shared/components';

/***** Import de types *****/
import { Alert as AlertType } from '../../../../../../shared/components/feedback/alert/alert.type';

@Component({
  selector: 'app-alert-documentation',
  imports: [DocumentationTemplate, Flex, Alert, Text],
  templateUrl: './alert-documentation.html',
  styleUrl: './alert-documentation.scss',
})
export class AlertDocumentation {
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
