# 📡 API Documentation - Calendrier PME Québec

## Vue d'ensemble

L'API de Calendrier PME est minimaliste et conçue pour le MVP. Elle utilise les API Routes de Next.js.

## Base URL

- **Production:** `https://calendrierpme.ca/api`
- **Local:** `http://localhost:3000/api`

---

## Endpoints

### POST /api/subscribe

Inscrit un email à la newsletter des rappels.

#### Request

```bash
curl -X POST https://calendrierpme.ca/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "entrepreneur@example.com"}'
```

#### Body Parameters

| Paramètre | Type | Requis | Description |
|-----------|------|--------|-------------|
| `email` | string | ✅ | Adresse email valide |

#### Response - Succès (200)

```json
{
  "success": true,
  "message": "Inscription réussie! Vérifiez vos emails."
}
```

#### Response - Erreur (400)

```json
{
  "success": false,
  "error": "Email invalide"
}
```

#### Response - Erreur (409)

```json
{
  "success": false,
  "error": "Cet email est déjà inscrit"
}
```

#### Response - Erreur Serveur (500)

```json
{
  "success": false,
  "error": "Erreur serveur, veuillez réessayer"
}
```

---

## Données Statiques

Les données du calendrier ne sont pas exposées via API REST. Elles sont chargées directement depuis `data/events.json` au build time pour des performances optimales.

### Accéder aux données (côté serveur)

```typescript
import { getAllEvents, getUpcomingEvents, getEventsByCategory } from '@/lib/events';

// Tous les événements
const events = getAllEvents();

// Prochains événements
const upcoming = getUpcomingEvents(5);

// Par catégorie
const fiscalEvents = getEventsByCategory('fiscal');
```

### Structure d'un événement

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;           // Format: YYYY-MM-DD
  category: 'fiscal' | 'subvention' | 'legal' | 'event';
  recurrence: 'once' | 'monthly' | 'quarterly' | 'annual';
  organization?: string;
  sourceUrl?: string;
  applicableTo?: ('incorporated' | 'sole-proprietor' | 'partnership' | 'all')[];
  priority?: 'high' | 'medium' | 'low';
  tags?: string[];
}
```

---

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Requête invalide (paramètres manquants ou incorrects) |
| 409 | Conflit (email déjà inscrit) |
| 429 | Trop de requêtes (rate limiting) |
| 500 | Erreur serveur |

---

## Rate Limiting

Pour protéger l'API:
- **Subscribe:** 5 requêtes par minute par IP
- Réponse si dépassé: `429 Too Many Requests`

---

## Headers Recommandés

```
Content-Type: application/json
Accept: application/json
```

---

## Évolutions Futures

Endpoints potentiels pour les versions futures:

- `GET /api/events` - Liste tous les événements (avec filtres)
- `GET /api/events/:id` - Détails d'un événement
- `GET /api/events/upcoming` - Prochains événements
- `GET /api/categories` - Liste des catégories
- `POST /api/ical` - Générer fichier iCal

Ces endpoints seront documentés lors de leur implémentation.
