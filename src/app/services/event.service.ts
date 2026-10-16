import { Injectable, signal, computed } from '@angular/core';
import { EventItem } from '../models/event.model';
import { INITIAL_EVENTS } from '../data/events.data';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Signal principal des événements
  readonly events = signal<EventItem[]>(INITIAL_EVENTS);

  // Signal des identifiants d'événements favoris
  readonly favoriteIds = signal<number[]>([1]); // 1 favori initial pour une démonstration immédiate

  // Signal calculé (computed) pour le total des favoris
  readonly favoritesCount = computed(() => this.favoriteIds().length);

  /**
   * Bascule le statut favori d'un événement (ajout ou retrait)
   * Utilise update() pour mettre à jour le Signal
   */
  toggleFavorite(eventId: number): void {
    this.favoriteIds.update(currentFavorites => {
      if (currentFavorites.includes(eventId)) {
        return currentFavorites.filter(id => id !== eventId);
      } else {
        return [...currentFavorites, eventId];
      }
    });
  }

  /**
   * Vérifie si un événement fait partie des favoris
   */
  isFavorite(eventId: number): boolean {
    return this.favoriteIds().includes(eventId);
  }

  /**
   * Récupère un événement selon son identifiant numérique
   */
  getEventById(id: number): EventItem | undefined {
    return this.events().find(event => event.id === id);
  }
}
