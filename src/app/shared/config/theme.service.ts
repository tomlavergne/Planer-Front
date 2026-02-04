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

  // Média query pour détecter le thème système
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    // Initialiser la détection du thème système
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Écouter les changements de préférence système
      this.mediaQuery.addEventListener('change', () => {
        if (this.theme() === 'auto') {
          this.applyTheme();
        }
      });
    }

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
  setTheme(newTheme: Theme): void {
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
    const effectiveTheme = this.getEffectiveTheme();

    // Appliquer l'attribut data-theme avec le thème effectif (light ou dark)
    document.documentElement.setAttribute(this.DOCUMENT_THEME_ATTRIBUTE, effectiveTheme);
    document.documentElement.setAttribute(
      this.DOCUMENT_PRIMARY_COLOR_ATTRIBUTE,
      this.primaryColor(),
    );
  }

  /**
   * Retourne le thème effectif (light ou dark) en tenant compte du mode auto
   */
  private getEffectiveTheme(): 'light' | 'dark' {
    const currentTheme = this.theme();

    if (currentTheme === 'auto') {
      // Si le mode est auto, détecter les préférences système
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }

    return currentTheme;
  }

  /**
   * Récupère une valeur stockée ou utilise le défaut
   */
  private getStoredValue(key: string, defaultValue: string): string {
    const stored = localStorage.getItem(key);
    return stored || defaultValue;
  }
}
