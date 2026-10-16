import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list';
import { EventDetailsComponent } from './components/event-details/event-details';
import { NotFoundComponent } from './components/not-found/not-found';

export const routes: Routes = [
  // Redirection de l'URL vide vers /events (Exigence 9)
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  // Route du catalogue d'événements
  {
    path: 'events',
    component: EventListComponent,
    title: 'EventHub - Catalogue des événements'
  },
  // Route paramétrée pour le détail d'un événement
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    title: 'EventHub - Détails de l\'événement'
  },
  // Chargement différé (Lazy loading) de la page About via loadComponent() (Exigence 12)
  {
    path: 'about',
    loadComponent: () => import('./components/about/about').then(m => m.AboutComponent),
    title: 'EventHub - À propos de l\'association'
  },
  // Route wildcard pour les pages introuvables 404 (Exigence 9)
  {
    path: '**',
    component: NotFoundComponent,
    title: 'EventHub - 404 Page introuvable'
  }
];
