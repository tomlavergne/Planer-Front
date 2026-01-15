/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button, Breadcrumb } from '../../..';
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';

@Component({
  selector: 'app-breadcrumb.doc',
  imports: [Flex, Button, Breadcrumb, DocumentationTemplate],
  templateUrl: './breadcrumb.doc.html',
})
export class BreadcrumbDoc {}
