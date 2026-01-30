import { Injectable, signal } from '@angular/core';
import type { Toast } from './toast/toast.type';

/**
 * Service pour gérer les toasts de l'application
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly DEFAULT_DURATION = 15000; // 5 secondes
  private readonly MAX_TOASTS = 5;

  // Liste des toasts actifs
  toasts = signal<Toast.Config[]>([]);

  // IDs des toasts en cours de suppression (pour animation)
  dismissingToasts = signal<Set<string>>(new Set());

  /**
   * Ajoute un toast
   */
  private add(config: Omit<Toast.Config, 'id'>): string {
    const id = this.generateId();
    const toast: Toast.Config = {
      ...config,
      id,
      duration: config.duration ?? this.DEFAULT_DURATION,
      dismissible: config.dismissible ?? true,
    };

    // Limite le nombre de toasts affichés
    const currentToasts = this.toasts();
    if (currentToasts.length >= this.MAX_TOASTS) {
      // Retire le plus ancien
      this.toasts.update((toasts) => toasts.slice(1));
    }

    this.toasts.update((toasts) => [...toasts, toast]);

    // Auto-suppression si durée définie
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => this.remove(id), toast.duration);
    }

    return id;
  }

  /**
   * Supprime un toast par son ID
   */
  remove(id: string): void {
    // Marque le toast comme en cours de suppression pour l'animation
    this.dismissingToasts.update((set) => {
      const newSet = new Set(set);
      newSet.add(id);
      return newSet;
    });

    // Attend la fin de l'animation avant de supprimer
    setTimeout(() => {
      this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
      this.dismissingToasts.update((set) => {
        const newSet = new Set(set);
        newSet.delete(id);
        return newSet;
      });
    }, 300); // Durée de l'animation de sortie
  }

  /**
   * Supprime tous les toasts
   */
  clear(): void {
    this.toasts.set([]);
  }

  /**
   * Affiche un toast primaire
   */
  primary(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'primary',
      message,
      title,
      icon: options?.icon ?? undefined,
      ...options,
    });
  }

  /**
   * Affiche un toast secondaire
   */
  secondary(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'secondary',
      message,
      title,
      icon: options?.icon ?? undefined,
      ...options,
    });
  }

  /**
   * Affiche un toast de succès
   */
  success(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'success',
      message,
      title,
      icon: options?.icon ?? 'lucideCheckCircle',
      ...options,
    });
  }

  /**
   * Affiche un toast d'erreur
   */
  danger(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'danger',
      message,
      title,
      icon: options?.icon ?? 'lucideXCircle',
      ...options,
    });
  }

  /**
   * Affiche un toast d'avertissement
   */
  warning(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'warning',
      message,
      title,
      icon: options?.icon ?? 'lucideAlertTriangle',
      ...options,
    });
  }

  /**
   * Affiche un toast d'information
   */
  info(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      color: 'info',
      message,
      title,
      icon: options?.icon ?? 'lucideInfo',
      ...options,
    });
  }

  custom(message: string, title?: string, options?: Partial<Toast.Config>): string {
    return this.add({
      message,
      title,
      icon: options?.icon ?? undefined,
      color: options?.color ?? undefined,
      ...options,
    });
  }

  /**
   * Génère un ID unique
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
