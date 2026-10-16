# 📅 EventHub — Catalogue d’Événements Campus

> **Mini-projet IACC • Angular 21 (v22+) • Architecture Standalone & Signals**  
> Application web monopage (SPA) client-side développée pour une association étudiante afin de présenter, filtrer et gérer les favoris des activités du campus (ateliers, conférences, compétitions, rencontres, tournois sportifs).

---

## 🌟 1. Présentation du projet

**EventHub** est une application web moderne et responsive qui permet aux étudiants et visiteurs du campus de :
- Consulter un catalogue d'activités riches et variées.
- Filtrer instantanément les événements par catégorie (Atelier, Conférence, Sport, Rencontre, Compétition) et par événement gratuit.
- Rechercher par mot-clé en temps réel.
- Ajouter et retirer des événements de leur liste de favoris grâce aux **Angular Signals**.
- Consulter une page détaillée pour chaque événement avec gestion des identifiants invalides.
- Découvrir l'association organisatrice via une page « À propos » chargée en **Lazy Loading** (`loadComponent()`).
- Bénéficier d'une page 404 conviviale pour toute URL inconnue.

L'application fonctionne **exclusivement côté client** en TypeScript : aucune dépendance API ou base de données externe n'est requise.

---

## 🛠️ 2. Technologies & Versions utilisées

| Technologie | Version | Rôle |
|---|---|---|
| **Angular** | `v22.2.0` (Génération moderne Standalone) | Framework frontend SPA |
| **Angular CLI** | `v22.2.3` | Outils de génération, build et serveur de dev |
| **TypeScript** | `~6.0.2` | Typage statique strict et logique métier |
| **Node.js / npm** | Node v20+ / npm v11+ | Environnement d'exécution et gestionnaire de paquets |
| **Vanilla CSS** | Standard CSS3 & Modern Design System | Styles modulaires, responsive (flexbox/grid) sans dépendance lourde |

---

## 🚀 3. Instructions d'installation et de lancement

### Prérequis
Assurez-vous d'avoir **Node.js** (version 18 ou supérieure) et **npm** installés sur votre machine.

### Étape 1 : Cloner le dépôt et accéder au dossier
```bash
git clone URL_DE_VOTRE_DEPOT
cd EventHub
```

### Étape 2 : Installer les dépendances
```bash
npm install
```

### Étape 3 : Lancer le serveur de développement
```bash
npm start
# ou
ng serve
```
Ouvrez ensuite votre navigateur sur [http://localhost:4200/](http://localhost:4200/). L'application se rechargera automatiquement lors de toute modification du code source.

### Étape 4 : Compiler pour la production
```bash
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/EventHub/`.

---

## 🧩 4. Structure des composants et rôle de chacun

L'application respecte rigoureusement l'architecture **Standalone Components** d'Angular :

```
src/app/
├── components/
│   ├── header/            # Composant Header de navigation
│   ├── event-list/        # Composant principal Catalogue d'événements
│   ├── event-card/        # Composant carte individuelle pour un événement
│   ├── event-details/     # Composant vue détaillée d'un événement
│   ├── about/             # Composant de présentation (Lazy Loaded)
│   └── not-found/         # Composant page 404 (Route wildcard **)
├── data/
│   └── events.data.ts     # Données initiales typées (tableau TypeScript)
├── models/
│   └── event.model.ts     # Interface TypeScript EventItem
├── services/
│   └── event.service.ts   # Service réactif avec Signals partagés
├── app.component.ts       # Composant racine
├── app.routes.ts          # Définition des routes et lazy loading
└── app.config.ts          # Configuration du routeur et locale fr-FR
```

### Rôle des composants (Exigence 3 du sujet) :
1. **`HeaderComponent`** : Affiche l'identité visuelle de l'association, la barre de navigation avec gestion des liens actifs (`routerLinkActive`) et le badge dynamique du compteur de favoris.
2. **`EventListComponent`** : Gère la liste complète des événements, les filtres réactifs par catégorie et gratuité, ainsi que le compteur de résultats et l'état vide via le nouveau Control Flow.
3. **`EventCardComponent`** : Composant enfant réutilisable recevant un événement via `input()`, affichant ses données formatées par des pipes, et notifiant le parent via `output()` lors de la bascule en favori.
4. **`EventDetailsComponent`** : Affiche la fiche détaillée complète d'une activité ciblée par son identifiant de route, avec inscription simulée et retour au catalogue, ou message d'erreur si l'identifiant est inexistant.
5. **`AboutComponent`** : Présente les missions, l'équipe et les statistiques de l'association étudiante, chargé à la demande en **lazy loading** via `loadComponent()`.
6. **`NotFoundComponent`** : Intercepte les routes inexistantes (`**`) pour afficher une interface 404 soignée et rediriger l'utilisateur vers le catalogue.

---

## 💡 5. Fonctionnalités et notions techniques mobilisées

- **Angular Signals (`signal`, `computed`, `update`, `set`)** :
  - `events = signal<EventItem[]>(...)` : Signal stockant la collection d'événements.
  - `favoriteIds = signal<number[]>([...])` : Signal des identifiants favoris mis à jour avec `update()`.
  - `favoritesCount = computed(...)` : Signal dérivé recalculant instantanément le nombre de favoris.
  - `selectedCategory = signal<string>('Tous')` : Signal mis à jour avec `set()` lors du clic sur un filtre.
  - `filteredEvents = computed(...)` : Calcul réactif de la liste filtrée sans recalculs superflus.
- **Nouveau Control Flow Angular** :
  - `@for (event of filteredEvents(); track event.id)` pour l'itération performante.
  - `@empty` pour le rendu automatique du message *« Aucun événement disponible »*.
  - `@if (isFavorite())` / `@else` pour l'état visuel du bouton favori.
- **Pipes intégrés et locale française** :
  - `DatePipe` : `{{ event.date | date:'EEE d MMM yyyy' }}` et `'fullDate'` en français.
  - `CurrencyPipe` : `{{ event.price | currency:'EUR':'symbol':'1.2-2' }}` pour les tarifs.
  - `UpperCasePipe` : `{{ event.category | uppercase }}` pour les badges de catégories.
- **Communication Parent / Enfant** :
  - `input.required<EventItem>()` et `input<boolean>()` dans `EventCardComponent`.
  - `output<number>()` avec émission d'événement lors du clic sur le favori.
- **Routage avancé** :
  - `withComponentInputBinding()` et `provideRouter(routes)`.
  - Redirection automatique de `''` vers `/events`.
  - Route paramétrée `/events/:id` avec récupération de l'identifiant et gestion des erreurs (404 / ID invalide).
  - Lazy loading de la route `/about` vérifiable dans l'onglet *Network* du navigateur.

---

## 📸 6. Captures d'écran de l'application

### 1. Catalogue complet des événements et filtres réactifs
![Catalogue d'événements](/screenshots/01-catalogue.png)

### 2. Page de détail d'un événement (`/events/:id`)
![Détails d'un événement](/screenshots/02-details.png)

### 3. État de liste vide (`@empty`) lors d'un filtre sans résultat
![Aucun événement disponible](/screenshots/03-empty-state.png)

### 4. Page « À propos » chargée en Lazy Loading (`/about`)
![Page À propos](/screenshots/04-about-lazy.png)

### 5. Page d'erreur 404 pour URL inconnue (`**`)
![Page 404](/screenshots/05-not-found-404.png)

---

## 📌 7. Commandes Git pour les 3 Checkpoints (Remise du projet)

Conformément à la consigne :
> *"Effectuer au minimum trois commits significatifs répartis pendant le travail (ex. initialisation, composants/Signals, routage/finalisation). Ne pas pousser node_modules/ , conserver le .gitignore généré"*

Voici les commandes exactes à exécuter dans votre terminal pour valider les **3 Checkpoints** puis lier votre dépôt distant :

### 🟢 Checkpoint 1 : Initialisation & structure des composants (Partie A)
```bash
git add angular.json package.json tsconfig.json tsconfig.app.json .gitignore src/styles.css src/index.html src/app/models/ src/app/components/header/
git commit -m "initialisation de la structure, styles globaux et composant header"
```

### 🟡 Checkpoint 2 : Données, Signals, EventCard & EventList (Partie B)
```bash
git add src/app/data/ src/app/services/ src/app/components/event-card/ src/app/components/event-list/ public/assets/
git commit -m "gestion des evenements et favoris avec les signals, filtres et event-card"
```

### 🔵 Checkpoint 3 : Routage, Lazy loading, Détails, 404 & README (Partie C & D)
```bash
git add src/app/app.routes.ts src/app/app.config.ts src/app/app.ts src/app/app.html src/app/app.css src/app/app.spec.ts src/app/components/event-details/ src/app/components/about/ src/app/components/not-found/ public/screenshots/ README.md
git commit -m "routage, page details, lazy loading about, 404 et readme"
```

### 🚀 Remise finale (Partie 5 : Publication sur votre dépôt GitHub)
```bash
git branch -M main
git remote add origin https://github.com/Josef-Bah/eventhub-angular21-Youssef-Bahdoudi.git
git push -u origin main
```
