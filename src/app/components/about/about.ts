import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  // Informations de l'association étudiante
  readonly associationName = 'EventHub Campus';
  readonly creationYear = 2024;
  readonly mission = 'Fédérer la vie étudiante, stimuler l’innovation technologique et créer du lien à travers des événements accessibles à tous.';

  readonly stats = [
    { value: '45+', label: 'Événements organisés' },
    { value: '1 800+', label: 'Participants conquis' },
    { value: '15+', label: 'Clubs & Partenaires' },
    { value: '100%', label: 'Esprit étudiant' }
  ];

  readonly team = [
    { name: 'Sarah Benali', role: 'Présidente & Coordination générale', emoji: '👩‍💼' },
    { name: 'Youssef El Mansouri', role: 'Responsable Technique & Tech Lead', emoji: '👨‍💻' },
    { name: 'Camille Dupont', role: 'Responsable Communication & Design', emoji: '🎨' },
    { name: 'Lucas Martin', role: 'Trésorier & Partenariats E-Sport', emoji: '🎮' }
  ];
}
