/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { DocumentationUsage } from '@features/documentation/children/documentation-usage/documentation-usage';
import { Flex, Text, Button } from '../../..';

/***** Import de drirectives *****/
import { TooltipDirective } from '../../../../directives/tooltip/tooltip';

/***** Import de types *****/
import { Documentation as DocumentationType } from '../../../../../features/documentation/documentation.type';

/***** Imports de services *****/
import { ToastService } from '../toast-stack.service';

@Component({
  selector: 'app-toast-stack.doc',
  imports: [DocumentationTemplate, DocumentationUsage, Flex, Button],
  templateUrl: './toast-stack.doc.html',
})
export class ToastStackDoc {
  toastService = inject(ToastService);

  primaryToast(): void {
    this.toastService.primary("Message d'information", 'Information');
  }
  secondaryToast(): void {
    this.toastService.secondary("Message d'information", 'Information');
  }
  infoToast(): void {
    this.toastService.info("Message d'information", 'Information');
  }
  successToast(): void {
    this.toastService.success('Message de succès', 'Succès');
  }
  warningToast(): void {
    this.toastService.warning('Message de warning', 'Attention');
  }
  dangerToast(): void {
    this.toastService.danger("Message d'erreur", 'Erreur');
  }
  customToast(): void {
    this.toastService.custom('Message custom', 'Custom', {
      icon: 'lucideStar',
      color: 'purple',
    });
  }

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'IconType.Name',
      default: null, //as IconType.Name | null,
      type: 'string | null',
      description: 'Texte affiché dans le bouton',
    },
  ];
}
