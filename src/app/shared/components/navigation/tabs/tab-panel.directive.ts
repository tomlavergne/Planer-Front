import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabPanel]',
  standalone: true,
})
export class TabPanelDirective {
  appTabPanel = input.required<string>(); // L'ID du tab

  constructor(public template: TemplateRef<unknown>) {}
}
