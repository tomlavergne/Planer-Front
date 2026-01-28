/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

/***** Imports de types *****/
import { Grid as GridType } from './grid.type';

@Component({
  selector: 'app-grid',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './grid.scss',
  host: {
    // Liaison dynamique des classes sur l'élément host
    '[class]': 'hostClasses()',
  },
})
export class Grid {
  /***** Inputs *****/
  display = input<GridType.Display>('grid');
  columns = input<Number>();
  rows = input<Number>();
  alignItems = input<GridType.AlignItems>('stretch');
  justifyItems = input<GridType.JustifyItems>('stretch');
  alignContent = input<GridType.AlignContent>('start');
  justifyContent = input<GridType.JustifyContent>('start');
  gap = input<GridType.Gap>('none');
  rowGap = input<GridType.RowGap>();
  columnGap = input<GridType.ColumnGap>();
  padding = input<GridType.Padding>('none');
  autoFlow = input<GridType.AutoFlow>('row');
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  fullHeight = input<boolean, any>(false, { transform: booleanAttribute });

  // Computed signal pour générer les classes dynamiquement
  hostClasses = computed(() => {
    return [
      'display-' + this.display(),
      this.columns() ? `columns-${this.columns()}` : '',
      this.rows() ? `rows-${this.rows()}` : '',
      `alignItems-${this.alignItems()}`,
      `justifyItems-${this.justifyItems()}`,
      `alignContent-${this.alignContent()}`,
      `justifyContent-${this.justifyContent()}`,
      `padding-${this.padding()}`,
      this.gap() !== 'none' ? `gap-${this.gap()}` : '',
      this.rowGap() ? `row-gap-${this.rowGap()}` : '',
      this.columnGap() ? `column-gap-${this.columnGap()}` : '',
      `autoFlow-${this.autoFlow()}`,
      this.fullWidth() ? 'full-width' : '',
      this.fullHeight() ? 'full-height' : '',
    ].join(' ');
  });
}
