/***** Imports de Angular *****/
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  template: `
    <label [for]="htmlFor()" [class]="required() ? 'required' : ''">
      <ng-content></ng-content>
      @if (required()) {
        <span class="required-indicator">*</span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      label {
        display: inline-block;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
        cursor: pointer;

        &.required {
          .required-indicator {
            color: var(--color-danger);
            margin-left: var(--spacing-xs);
          }
        }
      }
    `,
  ],
})
export class Label {
  /***** Inputs *****/
  htmlFor = input<string>('');
  required = input<boolean>(false);
}
