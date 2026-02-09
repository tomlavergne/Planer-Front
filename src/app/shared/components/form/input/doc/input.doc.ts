/***** Imports Angular *****/
import { Component, input, signal, computed } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Card, Text, Code, Input } from '../../..';
import { InputNumber } from '../variants/input-number';
import { InputSearch } from '../variants/input-search';
import { InputEmail } from '../variants/input-email';
import { DocumentationTemplate, Preview } from '@features/documentation/';

/***** Import de types *****/
import { Input as InputType } from '../input.type';

/***** Configuration de la documentation *****/
import { DOCUMENTATION_TEMPLATE_CONFIG } from '@features/documentation/children/documentation-template/documentation-template.config';

@Component({
  imports: [
    Flex,
    Card,
    Text,
    Code,
    DocumentationTemplate,
    Preview,
    Input,
    InputNumber,
    InputSearch,
    InputEmail,
  ],
  templateUrl: './input.doc.html',
})
export class InputDoc {
  documentationTemplateConfig = DOCUMENTATION_TEMPLATE_CONFIG;

  inputNumberValue = signal<Extract<InputType.Value, number>>(0);
  inputSearchValue = signal<Extract<InputType.Value, string>>('');
  inputEmailValue = signal<Extract<InputType.Value, string>>('');
  callback = () => {
    console.log('Action déclenchée !');
  };

  sizes: InputType.Size[] = ['sm', 'md', 'lg'];

  actions = computed<InputType.Action[]>(() => [
    {
      icon: 'lucideMinus',
      callback: () => this.callback(),
      tooltip: 'Retirer un nombre',
    },
    {
      icon: 'lucidePlus',
      callback: () => this.callback(),
      tooltip: 'Ajouter un nombre',
    },
  ]);
}
