# Architecture des Composants de Formulaire

## 📐 Architecture

Tous les composants de formulaire (Input, Select, Textarea, Checkbox, Toggle, FileDropper, etc.) héritent de la classe abstraite `FormItemBase` qui fournit :

### ✨ Propriétés communes

```typescript
// Apparence
placeholder: string; // Texte d'aide
size: 'sm' | 'md' | 'lg'; // Taille visuelle
variant: 'solid' | 'soft' | 'outline'; // Style visuel
fullWidth: boolean; // Occupe toute la largeur

// Comportement
disabled: boolean; // Désactivé (grisé)
readonly: boolean; // Lecture seule
required: boolean; // Champ obligatoire

// Validation
validator: ValidatorFn; // Fonction de validation personnalisée
disableValidation: boolean; // Désactive la validation

// Métadonnées
name: string; // Nom du champ
id: string; // ID pour accessibilité
hint: string; // Texte d'aide sous le champ

// Valeur et erreur (models - two-way binding)
value: T; // Valeur actuelle
errorMessage: string | null; // Message d'erreur
```

### 📊 Signals d'état

```typescript
isFocused: boolean; // Le champ a le focus
isTouched: boolean; // Le champ a été visité (focus puis blur)
isDirty: boolean; // La valeur a été modifiée
isValid: boolean(computed); // Le champ est valide
hasError: boolean(computed); // Le champ a une erreur
isEditable: boolean(computed); // Non disabled et non readonly
state: ControlState(computed); // État complet
```

### 🎬 Outputs

```typescript
focused: void              // émis au focus
blurred: void              // émis au blur
valueChange: T             // émis quand la valeur change
```

### 🛠️ Méthodes

```typescript
// État
markAsTouched()            // Marque comme visité
markAsUntouched()          // Marque comme non visité
markAsDirty()              // Marque comme modifié
markAsPristine()           // Marque comme non modifié

// Validation
validate(): boolean        // Valide et retourne true/false

// Réinitialisation
reset()                    // Réinitialise à la valeur initiale
resetWith(newValue)        // Réinitialise avec une nouvelle valeur

// Événements
onFocus()                  // Gère le focus
onBlur()                   // Gère le blur
handleValueChange(value)   // Gère le changement de valeur

// Abstract
focus(): void              // Donne le focus (à implémenter)
```

## 🏗️ Créer un nouveau composant de formulaire

### 1. Composant de base (ex: Select)

```typescript
import { FormItemBase } from '../base/form-item.base';

@Component({
  selector: 'app-select',
  template: `...`,
})
export class Select<T = any> extends FormItemBase<T> {
  // Propriétés spécifiques à Select
  options = input<SelectOption[]>([]);
  multiple = input<boolean>(false);

  // ViewChild vers l'élément natif
  selectElement = viewChild<ElementRef<HTMLSelectElement>>('selectElement');

  // Implémenter focus() (requis)
  focus(): void {
    this.selectElement()?.nativeElement.focus();
  }

  // Méthode spécifique
  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.handleValueChange(value as T); // Utilise la méthode de la base
  }
}
```

### 2. Variant de composant (ex: InputEmail)

```typescript
import { InputBase } from '../base/input.base';

@Component({
  selector: 'app-input-email',
  template: `<app-input
    #inputControl
    [(value)]="value"
    [(errorMessage)]="errorMessage"
    [icon]="icon() || 'lucideAtSign'"
    [placeholder]="placeholder() || 'Saisissez un email'"
    [disabled]="disabled()"
    [readonly]="readonly()"
    [required]="required()"
    [fullWidth]="fullWidth()"
    [size]="size()"
    [validator]="validateValue"
    (focused)="onFocus()"
    (blurred)="onBlur()"
  />`,
})
export class InputEmail extends InputBase {
  // Propriétés spécifiques
  showClearButton = input<boolean>(false);

  // Référence à l'input sous-jacent
  inputControl = viewChild.required<Input>('inputControl');

  // Validation spécifique
  validateValue = (value: string) => {
    // ... validation email
    return null; // ou message d'erreur
  };

  // Implémenter focus()
  focus(): void {
    this.inputControl().focus();
  }
}
```

## 💡 Utilisation

### Avec FormField (recommandé)

```html
<app-form-field label="Email" badge="Obligatoire">
  <app-input-email [(value)]="email" required fullWidth />
</app-form-field>
```

FormField lit automatiquement `errorMessage` via `contentChild()`.

### Standalone

```html
<app-input
  [(value)]="name"
  placeholder="Votre nom"
  [validator]="nameValidator"
  required
  fullWidth
  size="lg"
/>

@if (inputControl.errorMessage()) {
<p>{{ inputControl.errorMessage() }}</p>
}
```

### Accès à l'état

```typescript
export class MyForm {
  emailControl = viewChild(InputEmail);

  submit() {
    const control = this.emailControl();

    // Valider
    if (!control.validate()) {
      console.log('Erreur:', control.errorMessage());
      return;
    }

    // Vérifier l'état
    console.log('État:', control.state());
    // { isTouched: true, isDirty: true, isValid: true, ... }

    // Réinitialiser
    control.reset();
  }
}
```

## 🎯 Validation

### Validation intégrée

```typescript
// Required (automatique si required=true)
<app-input required />

// Validation personnalisée
validator = (value: string) => {
  if (value.length < 3) return 'Minimum 3 caractères';
  if (!/^[a-z]+$/i.test(value)) return 'Lettres uniquement';
  return null;
};

<app-input [validator]="validator" />
```

### Validation multi-critères

```typescript
import { FormItem } from '@shared/components/form/base/form-item.type';

// Créer des validateurs réutilisables
const minLength =
  (min: number): FormItem.ValidatorFn =>
  (value) =>
    value.length < min ? `Minimum ${min} caractères` : null;

const email: FormItem.ValidatorFn = (value) =>
  /^[^@]+@[^@]+\.[^@]+$/.test(value) ? null : 'Email invalide';

// Composer plusieurs validateurs
const compose =
  (...fns: FormItem.ValidatorFn[]): FormItem.ValidatorFn =>
  (value) => {
    for (const fn of fns) {
      const error = fn(value);
      if (error) return error;
    }
    return null;
  };

// Utiliser
emailValidator = compose((v) => (v ? null : 'Email requis'), email, minLength(5));
```

## 🔧 Filtres

Les filtres transforment la valeur en temps réel pendant la saisie :

```typescript
// Chiffres uniquement
numberFilter = (value: string) => value.replace(/[^0-9]/g, '');

// Majuscules
upperFilter = (value: string) => value.toUpperCase();

// Utilisation
<app-input [filter]="numberFilter" />
```

## 📚 Composants disponibles

### Existants

- ✅ **Input** - Champ texte de base
- ✅ **InputEmail** - Input avec validation email
- ✅ **InputNumber** - Input numérique avec +/-
- ✅ **InputSearch** - Input de recherche avec clear

### À créer (même pattern)

- 🔲 **InputPassword** - Input mot de passe avec toggle show/hide
- 🔲 **InputUrl** - Input URL avec validation
- 🔲 **InputPhone** - Input téléphone avec masque
- 🔲 **Textarea** - Zone de texte multiligne
- 🔲 **Select** - Liste déroulante
- 🔲 **Checkbox** - Case à cocher
- 🔲 **Toggle** - Interrupteur
- 🔲 **RadioGroup** - Groupe de boutons radio
- 🔲 **FileDropper** - Upload de fichiers
- 🔲 **DatePicker** - Sélecteur de date
- 🔲 **TimePicker** - Sélecteur d'heure
- 🔲 **ColorPicker** - Sélecteur de couleur
- 🔲 **Slider** - Curseur numérique

## 🎨 Avantages de cette architecture

✅ **Zéro duplication** - Propriétés communes déclarées une seule fois  
✅ **Cohérence** - Tous les contrôles ont le même comportement  
✅ **Type-safe** - TypeScript garantit la cohérence  
✅ **Extensible** - Facile d'ajouter de nouveaux contrôles  
✅ **Testable** - Logique centralisée facile à tester  
✅ **Maintenable** - Modification dans FormItemBase = tous les contrôles mis à jour  
✅ **Réactif** - Signals et computed pour la réactivité Angular  
✅ **Accessible** - Support des propriétés ARIA via name/id
