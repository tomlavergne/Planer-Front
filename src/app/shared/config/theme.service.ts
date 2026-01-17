import { Injectable, signal, effect } from '@angular/core';

import type { PrimaryColor, NeutralColor } from '../types/ui.types';

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
  private readonly STORAGE_NEUTRAL_KEY = 'app-neutral';
  private readonly STORAGE_PRIMARY_KEY = 'app-primary';
  private readonly STORAGE_RADIUS_KEY = 'app-radius';

  // États du thème
  theme = signal<Theme>(this.getStoredValue(this.STORAGE_THEME_KEY, 'auto') as Theme);
  neutral = signal<NeutralColor>(
    this.getStoredValue(this.STORAGE_NEUTRAL_KEY, 'gray') as NeutralColor,
  );
  primary = signal<PrimaryColor>(
    this.getStoredValue(this.STORAGE_PRIMARY_KEY, 'blue') as PrimaryColor,
  );
  radius = signal<Radius>(this.getStoredValue(this.STORAGE_RADIUS_KEY, 'md') as Radius);

  // Thème effectif (résolu si "auto")
  effectiveTheme = signal<'light' | 'dark'>('light');

  constructor() {
    // Appliquer tous les attributs au démarrage
    this.applyAllAttributes();

    // Observer les changements
    effect(() => {
      this.applyAllAttributes();
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
   * Change la palette neutre
   */
  setNeutral(neutral: NeutralColor): void {
    this.neutral.set(neutral);
    localStorage.setItem(this.STORAGE_NEUTRAL_KEY, neutral);
  }

  /**
   * Change la couleur primaire
   */
  setPrimary(primary: PrimaryColor): void {
    this.primary.set(primary);
    localStorage.setItem(this.STORAGE_PRIMARY_KEY, primary);
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
   * Applique tous les attributs au document
   */
  private applyAllAttributes(): void {
    const resolvedTheme = this.resolveTheme(this.theme());
    this.effectiveTheme.set(resolvedTheme);

    // Appliquer tous les attributs data au document
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.setAttribute('data-neutral', this.neutral());
    document.documentElement.setAttribute('data-primary', this.primary());
    document.documentElement.setAttribute('data-radius', this.radius());

    // Classes pour rétrocompatibilité
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
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
        this.applyAllAttributes();
      }
    });
  }
}
