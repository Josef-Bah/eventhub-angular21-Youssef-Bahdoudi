import { EventItem } from '../models/event.model';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Atelier TypeScript',
    category: 'Atelier',
    date: '2026-11-15T14:00:00',
    place: 'Campus - Bâtiment Ada Lovelace, Salle 204',
    price: 0,
    imageUrl: 'assets/events/typescript.svg',
    description: 'Découverte des concepts avancés de TypeScript, typage statique, génériques et meilleures pratiques pour Angular.',
    organizer: 'Club Dev & OpenSource',
    capacity: 30
  },
  {
    id: 2,
    title: 'Conférence IA & Futur du Web',
    category: 'Conférence',
    date: '2026-11-20T18:30:00',
    place: 'Grand Amphithéâtre Turing',
    price: 0,
    imageUrl: 'assets/events/ai-web.svg',
    description: 'Une keynote immersive sur l’impact des modèles d’IA générative dans l’écosystème web moderne et les architectures futures.',
    organizer: 'Association Tech & Science',
    capacity: 180
  },
  {
    id: 3,
    title: 'Tournoi E-Sport Inter-Promos',
    category: 'Sport',
    date: '2026-11-28T10:00:00',
    place: 'Gymnase Universitaire & Espace Gaming',
    price: 10,
    imageUrl: 'assets/events/esport.svg',
    description: 'Compétition festive sur plusieurs jeux populaires (League of Legends, Rocket League, Smash Bros). Lots et trophées à remporter !',
    organizer: 'BDE & Club Gaming',
    capacity: 64
  },
  {
    id: 4,
    title: 'Atelier UI/UX & Figma Moderne',
    category: 'Atelier',
    date: '2026-12-05T15:00:00',
    place: 'Lab Média & Design',
    price: 5,
    imageUrl: 'assets/events/design.svg',
    description: 'Apprenez à concevoir des maquettes interactives, des design systems réutilisables et des prototypes vivants avec Figma.',
    organizer: 'Design Collective',
    capacity: 25
  },
  {
    id: 5,
    title: 'Meetup Rencontre Alumni & Réseautage',
    category: 'Rencontre',
    date: '2026-12-12T19:00:00',
    place: 'Foyer Étudiant & Terrasse',
    price: 0,
    imageUrl: 'assets/events/networking.svg',
    description: 'Échange convivial autour d’un cocktail avec des anciens diplômés travaillant chez Google, Deezer, Airbus et des startups innovantes.',
    organizer: 'Réseau Alumni',
    capacity: 100
  },
  {
    id: 6,
    title: 'Hackathon 24h : Code for Good',
    category: 'Compétition',
    date: '2026-12-18T09:00:00',
    place: 'Incubateur Étudiant Hub 42',
    price: 15,
    imageUrl: 'assets/events/hackathon.svg',
    description: '24 heures non-stop pour imaginer et développer une solution numérique à impact écologique et solidaire. Repas et snacks fournis.',
    organizer: 'Green Tech Hub',
    capacity: 50
  },
  {
    id: 7,
    title: 'Conférence Cybersécurité & Défense Éthique',
    category: 'Conférence',
    date: '2027-01-14T17:00:00',
    place: 'Amphi Alan Turing',
    price: 0,
    imageUrl: 'assets/events/cybersecurity.svg',
    description: 'Démonstrations de tests d’intrusion, sensibilisation aux failles OWASP et bonnes pratiques pour sécuriser les applications Angular.',
    organizer: 'Club CyberSec',
    capacity: 120
  }
];
