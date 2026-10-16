export interface EventItem {
  id: number;
  title: string;
  category: 'Atelier' | 'Conférence' | 'Sport' | 'Rencontre' | 'Compétition';
  date: string;
  place: string;
  price: number;
  imageUrl: string;
  description: string;
  organizer?: string;
  capacity?: number;
}
