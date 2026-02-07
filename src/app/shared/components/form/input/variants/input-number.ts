/***** Imports de Angular *****/
import { Component, input, model, booleanAttribute, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input } from '../input';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';
type NumberInputValue = Extract<InputType.Value, number>;

@Component({
  selector: 'app-input-number',
  imports: [FormsModule, Input],
  template: `<app-input
    [(value)]="value"
    placeholder="Entrez un nombre"
    [actions]="showControls() ? actions() : null"
    [validator]="validateValue"
  />`,
})
export class InputNumber {
  showControls = input<boolean, any>(false, { transform: booleanAttribute });
  onlyPositive = input<boolean, any>(false, { transform: booleanAttribute });
  value = model<NumberInputValue>(0);

  // Filtre qui ne garde que les chiffres et le signe négatif
  numberFilter: InputType.FilterFn = (value: string) => {
    if (this.onlyPositive()) {
      return value.replace(/[^0-9]/g, '');
    } else {
      return value.replace(/[^0-9-]/g, '');
    }
  };

  actions = computed<InputType.Action[]>(() => [
    {
      icon: 'lucideMinus',
      callback: () => this.decreaseValue(),
      disabled: this.onlyPositive() && this.value() <= 0,
      tooltip: 'Retirer un nombre',
    },
    {
      icon: 'lucidePlus',
      callback: () => this.increaseValue(),
      tooltip: 'Ajouter un nombre',
    },
  ]);

  increaseValue() {
    this.value.set(Number(this.value()) + 1);
  }

  decreaseValue() {
    this.value.set(this.value() - 1);
  }

  validateValue: InputType.ValidatorFn = (value: NumberInputValue) => {
    const numValue = Number(value as unknown as string);
    if (isNaN(numValue)) {
      return 'Veuillez entrer un nombre valide';
    }
    return null;
  };
}
