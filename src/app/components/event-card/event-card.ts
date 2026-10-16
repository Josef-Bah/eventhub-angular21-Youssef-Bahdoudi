import { Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventItem } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe, UpperCasePipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCardComponent {
  // Entrée du composant pour recevoir les données de l'événement depuis le parent (EventList)
  readonly event = input.required<EventItem>();

  // Entrée indiquant si l'événement actuel est dans les favoris
  readonly isFavorite = input<boolean>(false);

  // Sortie (output) pour notifier le parent lors du clic sur le bouton favori
  readonly toggleFavorite = output<number>();

  /**
   * Émet l'identifiant de l'événement vers le composant parent
   */
  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.event().id);
  }
}
