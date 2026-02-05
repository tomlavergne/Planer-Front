/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Card, Text, Code, Select } from '../../..';
import { DocumentationTemplate, Preview } from '@features/documentation/';

/***** Import de types *****/
import { Select as SelectType } from '../select.type';

@Component({
  imports: [Flex, Card, Text, Code, DocumentationTemplate, Preview, Select],
  templateUrl: './select.doc.html',
})
export class SelectDoc {
  options: SelectType.Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
    // { value: 'option8', label: 'Option 8' },
    // { value: 'option9', label: 'Option 9' },
    // { value: 'option10', label: 'Option 10' },
    // { value: 'option11', label: 'Option 11' },
    // { value: 'option12', label: 'Option 12' },
    // { value: 'option13', label: 'Option 13' },
    // { value: 'option14', label: 'Option 14' },
    // { value: 'option15', label: 'Option 15' },
    // { value: 'option16', label: 'Option 16' },
    // { value: 'option17', label: 'Option 17' },
    // { value: 'option18', label: 'Option 18' },
    // { value: 'option19', label: 'Option 19' },
    // { value: 'option20', label: 'Option 20' },
    // { value: 'option21', label: 'Option 21' },
    // { value: 'option22', label: 'Option 22' },
    // { value: 'option23', label: 'Option 23' },
    // { value: 'option24', label: 'Option 24' },
    // { value: 'option25', label: 'Option 25' },
    // { value: 'option26', label: 'Option 26' },
    // { value: 'option27', label: 'Option 27' },
    // { value: 'option28', label: 'Option 28' },
    // { value: 'option29', label: 'Option 29' },
    // { value: 'option30', label: 'Option 30' },
  ];

  groups: SelectType.OptionGroup[] = [
    {
      label: 'Groupe 1',
      options: [
        { value: 'group1-option1', label: 'Groupe 1 - Option 1' },
        { value: 'group1-option2', label: 'Groupe 1 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
    {
      label: 'Groupe 2',
      options: [
        { value: 'group2-option1', label: 'Groupe 2 - Option 1' },
        { value: 'group2-option2', label: 'Groupe 2 - Option 2' },
      ],
    },
  ];
}
