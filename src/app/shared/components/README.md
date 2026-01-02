# 🎨 Composants UI - Bibliothèque Radix-like pour Angular

Bibliothèque de composants UI modulaires et accessibles inspirée de Radix UI, construite avec Angular 19+ et Signals.

## 📦 Structure

```
src/app/shared/components/
├── forms/          # Composants de formulaire
├── display/        # Composants d'affichage
├── overlay/        # Composants overlay (popover, dialog, tooltip)
├── navigation/     # Composants de navigation
├── feedback/       # Composants de feedback
├── layout/         # Composants de mise en page
└── index.ts        # Export centralisé
```

## 🚀 Composants Disponibles

### 📝 Forms

#### **Button**

Bouton personnalisable avec icônes et variantes.

```typescript
<app-button
  label="Click me"
  variant="primary"
  size="md"
  iconName="lucideUser"
  fullWidth
  (clicked)="handleClick()"
/>
```

**Props:**

- `label`: string | null
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'xs' | 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `iconName`: LucideIconName | null
- `fullWidth`: boolean
- `rounded`: boolean

#### **Input**

Champ de saisie avec préfixes/suffixes.

```typescript
<app-input
  [(value)]="email"
  type="email"
  placeholder="Email"
  size="md"
  prefixIcon="lucideMail"
  error
  fullWidth
/>
```

**Props:**

- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
- `placeholder`: string
- `size`: Size
- `variant`: 'default' | 'filled' | 'outline'
- `disabled`, `readonly`, `error`, `fullWidth`: boolean
- `prefixIcon`, `suffixIcon`: LucideIconName | null

#### **Textarea**

Zone de texte avec auto-resize et compteur de caractères.

```typescript
<app-textarea
  [(value)]="description"
  placeholder="Description"
  [maxLength]="500"
  [rows]="3"
  autoResize
  fullWidth
/>
```

**Props:**

- `placeholder`: string
- `rows`: number
- `maxLength`: number | null
- `size`: Size
- `autoResize`, `disabled`, `readonly`, `error`, `fullWidth`: boolean

#### **Checkbox**

Case à cocher avec état indéterminé.

```typescript
<app-checkbox
  [(checked)]="accepted"
  label="J'accepte les conditions"
  size="md"
  indeterminate
/>
```

**Props:**

- `label`: string | null
- `size`: Size
- `disabled`, `error`, `indeterminate`: boolean

#### **Switch**

Toggle switch.

```typescript
<app-switch
  [(checked)]="enabled"
  label="Activer les notifications"
  size="md"
/>
```

**Props:**

- `label`: string | null
- `size`: Size
- `disabled`: boolean

#### **Select**

Menu déroulant.

```typescript
const options: SelectOption[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' }
];

<app-select
  [options]="options"
  [(value)]="language"
  placeholder="Choisir une langue"
  size="md"
  fullWidth
/>
```

**Props:**

- `options`: SelectOption[]
- `placeholder`: string
- `size`: Size
- `disabled`, `error`, `fullWidth`: boolean

#### **RadioGroup**

Groupe de boutons radio.

```typescript
const options: RadioOption[] = [
  { value: 'sm', label: 'Petit' },
  { value: 'md', label: 'Moyen' },
  { value: 'lg', label: 'Grand' }
];

<app-radio-group
  [options]="options"
  [(value)]="selectedSize"
  name="size"
  orientation="horizontal"
/>
```

**Props:**

- `options`: RadioOption[]
- `name`: string
- `size`: Size
- `orientation`: 'horizontal' | 'vertical'
- `disabled`, `error`: boolean

#### **Label**

Label accessible pour les champs de formulaire.

```typescript
<app-label htmlFor="email" [required]="true">
  Email
</app-label>
```

**Props:**

- `htmlFor`: string
- `required`: boolean

---

### 🎨 Display

#### **Badge**

Badge avec variantes de couleur.

```typescript
<app-badge variant="primary" size="md">
  Nouveau
</app-badge>
```

**Props:**

- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
- `size`: Size

#### **Card**

Carte avec header et footer optionnels.

```typescript
<app-card hoverable clickable>
  <div card-header>
    <h3>Titre</h3>
  </div>

  <p>Contenu de la carte</p>

  <div card-footer>
    <app-button>Action</app-button>
  </div>
</app-card>
```

**Props:**

- `hoverable`: boolean
- `clickable`: boolean

#### **Separator**

Séparateur horizontal ou vertical.

```typescript
<app-separator orientation="horizontal" />
```

**Props:**

- `orientation`: 'horizontal' | 'vertical'

#### **Avatar**

Avatar avec image ou placeholder.

```typescript
<app-avatar
  imageUrl="/img/profile.png"
  size="lg"
/>
```

**Props:**

- `imageUrl`: string | null
- `size`: Size

---

### 🎭 Overlay

#### **Dialog**

Modal avec header et footer.

```typescript
@Component({...})
export class MyComponent {
  dialog = viewChild(Dialog);

  openDialog() {
    this.dialog()?.open();
  }
}

<app-dialog
  #dialog
  title="Confirmation"
  size="md"
  closeOnBackdrop
  showCloseButton
>
  <p>Êtes-vous sûr ?</p>

  <div dialog-footer>
    <app-button variant="outline" (clicked)="dialog.close()">
      Annuler
    </app-button>
    <app-button variant="primary">
      Confirmer
    </app-button>
  </div>
</app-dialog>
```

**Props:**

- `title`: string | null
- `size`: Size
- `closeOnBackdrop`, `showCloseButton`: boolean

#### **Popover**

Popover positionné.

```typescript
<app-popover position="bottom" autoPosition closeOnClickOutside>
  <app-button>Ouvrir</app-button>

  <div popover-content>
    <p>Contenu du popover</p>
  </div>
</app-popover>
```

**Props:**

- `position`: AdvancedRelativePosition
- `disabled`, `autoPosition`, `closeOnClickOutside`: boolean

#### **Tooltip**

Tooltip au survol.

```typescript
<app-tooltip position="top" content="Ceci est un tooltip">
  <app-button>Survolez-moi</app-button>
</app-tooltip>
```

**Props:**

- `content`: string
- `position`: RelativePosition
- `disabled`: boolean

---

### 🧭 Navigation

#### **Tabs**

Onglets avec panels.

```typescript
const tabs: TabItem[] = [
  { id: 'tab1', label: 'Onglet 1' },
  { id: 'tab2', label: 'Onglet 2' },
  { id: 'tab3', label: 'Onglet 3', disabled: true }
];

<app-tabs
  [tabs]="tabs"
  [defaultTab]="'tab1'"
  orientation="horizontal"
  (tabChange)="onTabChange($event)"
>
  <div tab-panel="tab1">Contenu 1</div>
  <div tab-panel="tab2">Contenu 2</div>
</app-tabs>
```

**Props:**

- `tabs`: TabItem[]
- `defaultTab`: string | null
- `orientation`: 'horizontal' | 'vertical'

---

### 💬 Feedback

#### **Progress**

Barre de progression.

```typescript
<app-progress
  [value]="75"
  [max]="100"
  variant="primary"
  size="md"
  showValue
/>

<!-- Indeterminate -->
<app-progress indeterminate />
```

**Props:**

- `value`: number
- `max`: number
- `size`: Size
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'danger'
- `indeterminate`, `showValue`: boolean

#### **Alert**

Alerte avec icône.

```typescript
<app-alert
  variant="success"
  title="Succès"
  dismissible
  (dismissed)="handleDismiss()"
>
  Votre action a été effectuée avec succès.
</app-alert>
```

**Props:**

- `variant`: 'info' | 'success' | 'warning' | 'danger'
- `title`: string | null
- `dismissible`, `showIcon`: boolean

#### **Skeleton**

Placeholder de chargement.

```typescript
<app-skeleton variant="text" width="200px" />
<app-skeleton variant="circular" width="40px" height="40px" />
<app-skeleton variant="rectangular" width="100%" height="200px" />
```

**Props:**

- `variant`: 'text' | 'circular' | 'rectangular' | 'rounded'
- `width`, `height`: string | null
- `animated`: boolean

---

### 📐 Layout

#### **Flex**

Container flexbox.

```typescript
<app-flex
  direction="row"
  alignItems="center"
  justifyContent="between"
  gap="md"
  fullWidth
>
  <div>Item 1</div>
  <div>Item 2</div>
</app-flex>
```

**Props:**

- `direction`: 'row' | 'column'
- `alignItems`: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
- `justifyContent`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- `gap`: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `fullWidth`: boolean

#### **Spacer**

Espace flexible.

```typescript
<app-spacer orientation="horizontal" />
```

**Props:**

- `orientation`: 'horizontal' | 'vertical'

---

## 🎯 Patterns Communs

### Boolean Attributes

Tous les props booléens supportent la syntaxe sans valeur :

```typescript
<!-- Au lieu de -->
<app-button [fullWidth]="true" />

<!-- Vous pouvez écrire -->
<app-button fullWidth />
```

### Two-way Binding

Les composants de formulaire supportent `[(value)]` ou `[(checked)]` :

```typescript
<app-input [(value)]="email" />
<app-checkbox [(checked)]="accepted" />
```

### Slots avec ng-content

Beaucoup de composants supportent des slots nommés :

```typescript
<app-card>
  <div card-header>Header</div>
  Contenu
  <div card-footer>Footer</div>
</app-card>
```

---

## 🎨 Design Tokens

Les composants utilisent des variables CSS pour le theming :

- `--color-primary`, `--color-primary-hover`, `--color-primary-alpha`
- `--color-surface`, `--color-surface-hover`
- `--color-border`, `--color-border-hover`
- `--color-text`, `--color-text-secondary`
- `--color-success`, `--color-warning`, `--color-danger`
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- `--font-size-xs`, `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-xl`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

---

## 📚 Import

```typescript
import { Button, Input, Dialog, Select, type SelectOption } from '@/shared/components';
```

---

## ✅ Fonctionnalités

- ✅ **Accessibilité** : ARIA roles et attributs
- ✅ **Keyboard Navigation** : ESC, Tab, Arrow keys
- ✅ **Two-way Binding** : model() pour les formulaires
- ✅ **Animations** : Transitions fluides
- ✅ **TypeScript** : Types stricts
- ✅ **Signals** : Reactivity moderne d'Angular
- ✅ **SCSS** : Styles modulaires avec imbrication
- ✅ **Responsive** : Design adaptatif
- ✅ **Dark Mode Ready** : Via variables CSS

---

**Créé avec ❤️ pour votre projet Angular**
