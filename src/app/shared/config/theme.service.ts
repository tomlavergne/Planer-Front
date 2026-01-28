import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Service pour gérer le thème de l'application
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_THEME_KEY = 'app-theme';
  private readonly STORAGE_RADIUS_KEY = 'app-radius';

  // États du thème
  theme = signal<Theme>(this.getStoredValue(this.STORAGE_THEME_KEY, 'light') as Theme);
  radius = signal<Radius>(this.getStoredValue(this.STORAGE_RADIUS_KEY, 'md') as Radius);

  // Thème effectif (résolu si "auto")
  effectiveTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Appliquer les attributs au démarrage
    this.applyTheme();

    // Observer les changements
    effect(() => {
      this.applyTheme();
    });

    // Observer les changements du thème système si en mode auto
    this.watchSystemTheme();
  }

  /**
   * Change le thème de l'application
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(this.STORAGE_THEME_KEY, theme);
  }

  /**
   * Change le radius
   */
  setRadius(radius: Radius): void {
    this.radius.set(radius);
    localStorage.setItem(this.STORAGE_RADIUS_KEY, radius);
  }

  /**
   * Toggle entre light et dark
   */
  toggleTheme(): void {
    const current = this.effectiveTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  /**
   * Applique le thème au document
   */
  private applyTheme(): void {
    const resolvedTheme = this.resolveTheme(this.theme());
    this.effectiveTheme.set(resolvedTheme);

    const root = document.documentElement;

    // Appliquer l'attribut data-theme
    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-radius', this.radius());

    // Classes pour rétrocompatibilité
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }

  /**
   * Résout le thème "auto" en fonction des préférences système
   */
  private resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }

  /**
   * Récupère une valeur stockée ou utilise le défaut
   */
  private getStoredValue(key: string, defaultValue: string): string {
    const stored = localStorage.getItem(key);
    return stored || defaultValue;
  }

  /**
   * Observe les changements du thème système
   */
  private watchSystemTheme(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', () => {
      if (this.theme() === 'auto') {
        this.applyTheme();
      }
    });
  }
}
