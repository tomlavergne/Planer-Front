import { Injectable, signal, effect } from '@angular/core';

/***** Import de type *****/
import { Theme, PrimaryColor } from '@shared/types';

/**
 * Service pour gérer le thème de l'application
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Clés de stockage
  private readonly STORAGE_THEME_KEY = 'app-theme';
  private readonly STORAGE_PRIMARY_COLOR_KEY = 'app-primary-color';

  // Attributs du document
  private readonly DOCUMENT_THEME_ATTRIBUTE = 'data-theme';
  private readonly DOCUMENT_PRIMARY_COLOR_ATTRIBUTE = 'data-primary-color';

  // États du thème
  theme = signal<Theme>(this.getStoredValue(this.STORAGE_THEME_KEY, 'light') as Theme);
  primaryColor = signal<PrimaryColor>(
    this.getStoredValue(this.STORAGE_PRIMARY_COLOR_KEY, 'indigo') as PrimaryColor,
  );

  constructor() {
    // Appliquer les attributs au démarrage
    this.applyTheme();

    // Observer les changements
    effect(() => {
      this.applyTheme();
    });
  }

  /**
   * Toggle entre light et dark
   */
  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';

    this.theme.set(newTheme);
    localStorage.setItem(this.STORAGE_THEME_KEY, newTheme);
  }

  setPrimaryColor(color: PrimaryColor): void {
    this.primaryColor.set(color);
    localStorage.setItem(this.STORAGE_PRIMARY_COLOR_KEY, color);
  }

  /**
   * Applique le thème au document
   */
  private applyTheme(): void {
    // Appliquer l'attribut data-theme
    document.documentElement.setAttribute(this.DOCUMENT_THEME_ATTRIBUTE, this.theme());
    document.documentElement.setAttribute(
      this.DOCUMENT_PRIMARY_COLOR_ATTRIBUTE,
      this.primaryColor(),
    );
  }

  /**
   * Récupère une valeur stockée ou utilise le défaut
   */
  private getStoredValue(key: string, defaultValue: string): string {
    const stored = localStorage.getItem(key);
    return stored || defaultValue;
  }
}
