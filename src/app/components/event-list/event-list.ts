import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventItem } from '../../models/event.model';
import { INITIAL_EVENTS } from '../../data/events.data';
import { EventCardComponent } from '../event-card/event-card';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventListComponent {
  // Injection du service partagé
  private readonly eventService = inject(EventService);

  // Question 4 : Définir les événements dans EventList via un Signal
  readonly events = signal<EventItem[]>(INITIAL_EVENTS);

  // Question 8 : Signal mémorisant la catégorie sélectionnée
  readonly selectedCategory = signal<string>('Tous');

  // Filtre supplémentaire pour les événements gratuits
  readonly onlyFree = signal<boolean>(false);

  // Terme de recherche textuel
  readonly searchTerm = signal<string>('');

  // Question 4 : Stocker la liste des favoris dans un Signal
  readonly favoriteIds = signal<number[]>(this.eventService.favoriteIds());

  // Question 4 : Calculer le nombre de favoris à partir du Signal de favoris
  readonly favoritesCount = computed(() => this.favoriteIds().length);

  // Liste des catégories disponibles pour les boutons de filtre
  readonly categories: string[] = ['Tous', 'Atelier', 'Conférence', 'Sport', 'Rencontre', 'Compétition'];

  // Signal calculé (computed) pour filtrer les événements en temps réel
  readonly filteredEvents = computed(() => {
    const list = this.events();
    const cat = this.selectedCategory();
    const search = this.searchTerm().trim().toLowerCase();
    const freeOnly = this.onlyFree();

    return list.filter(item => {
      // Filtre catégorie
      const matchesCategory = (cat === 'Tous') || (item.category === cat);
      // Filtre gratuit
      const matchesFree = !freeOnly || item.price === 0;
      // Filtre recherche texte
      const matchesSearch = !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.place.toLowerCase().includes(search);

      return matchesCategory && matchesFree && matchesSearch;
    });
  });

  /**
   * Question 8 : Mise à jour de la catégorie sélectionnée via set()
   */
  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  /**
   * Bascule le filtre "Gratuit uniquement"
   */
  toggleFreeFilter(): void {
    this.onlyFree.update(val => !val);
  }

  /**
   * Recherche par texte
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  /**
   * Question 7 : Gestionnaire d'output() reçu depuis EventCard
   * Utilise update() pour mettre à jour les favoris et synchroniser l'état
   */
  handleToggleFavorite(eventId: number): void {
    this.favoriteIds.update(current => {
      if (current.includes(eventId)) {
        return current.filter(id => id !== eventId);
      } else {
        return [...current, eventId];
      }
    });

    // Synchronisation avec le service global pour le Header et le Détail
    this.eventService.toggleFavorite(eventId);
  }

  /**
   * Vérifie si un événement est dans les favoris
   */
  isFavorite(eventId: number): boolean {
    return this.favoriteIds().includes(eventId);
  }

  /**
   * Réinitialisation de tous les filtres
   */
  resetFilters(): void {
    this.selectedCategory.set('Tous');
    this.onlyFree.set(false);
    this.searchTerm.set('');
  }
}
