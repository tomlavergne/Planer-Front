// Imports Angular
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Text } from '../../../../../../shared/components';

// Import de types
import { Text as TextType } from '../../../../../../shared/components/display/text/text.type';

@Component({
  selector: 'app-text-documentation',
  imports: [Flex, Text],
  templateUrl: './text-documentation.html',
  styleUrl: './text-documentation.scss',
})
export class TextDocumentation {
  textVariants: TextType.Variant[] = ['body', 'caption', 'heading', 'label'];
  textSizes: TextType.Size[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  textWeights: TextType.Weight[] = ['light', 'normal', 'medium', 'semibold', 'bold'];
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
