/***** Imports Anguar *****/
import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/***** Import de configuration *****/
import { DOCUMENTED_COMPONENTS } from './documentation.config';

/***** Import de types *****/
import type { Routing } from '@shared/types/routing.type';

export interface RouteNavigation {
  current: string | null;
  previous: string | null;
  next: string | null;
  currentIndex: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class DocumentationNavigationService {
  private router = inject(Router);

  /**
   * Récupérer les routes de documentation depuis la configuration
   * Cela préserve l'ordre défini dans documentation.config.ts
   */
  private getDocumentationRoutes(): string[] {
    const routes: string[] = [];

    DOCUMENTED_COMPONENTS.forEach((item: Routing.Item) => {
      if (item.content) {
        item.content.forEach((item: Routing.Item) => {
          routes.push(item.path);
        });
      } else {
        routes.push(item.path);
      }
    });

    return routes;
  }

  /**
   * Obtenir les informations de navigation pour la route actuelle
   */
  getNavigation(): RouteNavigation {
    const documentationRoutes = this.getDocumentationRoutes();
    const currentUrl = this.router.url;
    const currentRoute = this.extractDocRoute(currentUrl);
    const currentIndex = documentationRoutes.indexOf(currentRoute || '');

    return {
      current: currentRoute,
      previous: currentIndex > 0 ? documentationRoutes[currentIndex - 1] : null,
      next:
        currentIndex >= 0 && currentIndex < documentationRoutes.length - 1
          ? documentationRoutes[currentIndex + 1]
          : null,
      currentIndex: currentIndex >= 0 ? currentIndex : -1,
      total: documentationRoutes.length,
    };
  }

  /**
   * Observable qui émet à chaque changement de route
   */
  getNavigationChanges(): Observable<RouteNavigation> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.getNavigation()),
    );
  }

  /**
   * Naviguer vers la route précédente
   */
  navigateToPrevious(): void {
    const nav = this.getNavigation();
    if (nav.previous) {
      this.router.navigate(['/documentation', nav.previous]);
    }
  }

  /**
   * Naviguer vers la route suivante
   */
  navigateToNext(): void {
    const nav = this.getNavigation();
    if (nav.next) {
      this.router.navigate(['/documentation', nav.next]);
    }
  }

  /**
   * Extraire la route de documentation depuis l'URL complète
   */
  private extractDocRoute(url: string): string | null {
    const match = url.match(/\/documentation\/([^/?]+)/);
    return match ? match[1] : null;
  }

  /**
   * Obtenir toutes les routes de documentation
   */
  getAllRoutes(): string[] {
    return this.getDocumentationRoutes();
  }

  /**
   * Vérifier si une route existe
   */
  routeExists(route: string): boolean {
    return this.getDocumentationRoutes().includes(route);
  }
}
