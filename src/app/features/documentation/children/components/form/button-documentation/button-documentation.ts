/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { DocumentationTemplate } from '../../../documentation-template/documentation-template';
import { Flex, Button, Text } from '../../../../../../shared/components';

/***** Import de types *****/
import { Button as ButtonType } from '../../../../../../shared/components/forms/button/button.type';

@Component({
  selector: 'app-button-documentation',
  imports: [DocumentationTemplate, Flex, Button, Text],
  templateUrl: './button-documentation.html',
  styleUrl: './button-documentation.scss',
})
export class ButtonDocumentation {
  colors: ButtonType.Color[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'indigo',
    'purple',
    'pink',
    'gray',
  ];
  buttonVariants: ButtonType.Variant[] = ['solid', 'soft', 'outline', 'ghost'];
  buttonSizes: ButtonType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'];
}
