import { Component, computed, inject, input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventItem } from '../../models/event.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, CurrencyPipe, UpperCasePipe],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetailsComponent implements OnInit {
  // Option 1 : Récupération automatique du paramètre :id via withComponentInputBinding()
  readonly id = input<string>();

  // Option 2 : Injection de ActivatedRoute comme spécifié dans le cours
  private readonly route = inject(ActivatedRoute);
  readonly eventService = inject(EventService);

  // Événement trouvé ou undefined
  readonly event = computed<EventItem | undefined>(() => {
    // Essayer l'input du routeur, sinon le snapshot de ActivatedRoute
    const rawId = this.id() ?? this.route.snapshot.paramMap.get('id');
    const numericId = Number(rawId);
    if (isNaN(numericId)) return undefined;
    return this.eventService.getEventById(numericId);
  });

  // Calcul du statut favori
  readonly isFavorite = computed(() => {
    const current = this.event();
    return current ? this.eventService.isFavorite(current.id) : false;
  });

  ngOnInit(): void {
    // Faire défiler vers le haut lors de l'accès à la page de détails
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Bascule le statut favori de l'événement courant
   */
  onToggleFavorite(): void {
    const current = this.event();
    if (current) {
      this.eventService.toggleFavorite(current.id);
    }
  }

  /**
   * Partage ou simulation d'inscription
   */
  registerMessage = '';
  onRegister(): void {
    this.registerMessage = 'Inscription confirmée ! Vous recevrez un rappel par email avant l’événement.';
  }
}
