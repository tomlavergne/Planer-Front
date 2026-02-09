// Imports Angular
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Text } from '../../..';

// Import de types
import { Text as TextType } from '../text.type';
import { Documentation } from '../../../../../features/documentation/documentation';

@Component({
  selector: 'Text-doc',
  imports: [DocumentationTemplate, Flex, Text, Documentation],
  templateUrl: './text.doc.html',
})
export class TextDoc {
  textVariants: TextType.Variant[] = ['body', 'caption', 'heading', 'label'];
  textSizes: TextType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  textWeights: TextType.Weight[] = ['thin', 'regular', 'medium', 'semibold', 'bold'];
  textAligns: TextType.Align[] = ['left', 'center', 'right', 'justify'];
  textAs: TextType.As[] = [
    'p',
    'span',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'label',
    'small',
  ];
}
