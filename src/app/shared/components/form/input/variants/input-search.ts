/***** Imports de Angular *****/
import { Component, input, computed, model, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input } from '../input';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';

@Component({
  selector: 'app-input-search',
  imports: [FormsModule, Input],
  template: `<app-input
    [(value)]="value"
    [icon]="'lucideSearch'"
    placeholder="Rechercher"
    [actions]="actions()"
  />`,
})
export class InputSearch {
  showClearButton = input<boolean, any>(false, { transform: booleanAttribute });
  value = model<InputType.Value>('');

  actions = computed<InputType.Action[]>(() => {
    const result: InputType.Action[] = [];

    if (this.showClearButton() && this.value() !== '') {
      result.push({
        icon: 'lucideX',
        callback: () => this.clear(),
        tooltip: 'Effacer la recherche',
      });
    }

    return result;
  });

  clear() {
    this.value.set('');
  }
}
