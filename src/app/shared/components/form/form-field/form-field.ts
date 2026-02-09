/***** Import Angular *****/
import { Component, input, booleanAttribute } from '@angular/core';

/***** Import de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Text } from '../../misc/text/text';
import { Badge } from '../../misc/badge/badge';

/***** Import de types *****/
import { FormField as FormFieldType } from './form.type';

@Component({
  selector: 'app-form-field',
  imports: [Flex, Text, Badge],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  label = input<string>('');
  badge = input<string | null>(null);
  size = input<FormFieldType.Size>('sm');
  required = input<boolean, any>(false, { transform: booleanAttribute });

  /** Message d'erreur à afficher (passé par le parent) */
  errorMessage = input<string | null>(null);
}
