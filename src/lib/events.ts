import { CalendarEvent, CalendarData, EventCategory, CategoryMeta } from '@/types/event';
import eventsData from '../../data/events.json';

/**
 * Métadonnées des catégories
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'fiscal',
    label: 'Fiscal',
    labelFr: 'Fiscal',
    emoji: '💰',
    color: '#3b82f6',
    description: 'Échéances fiscales et déclarations',
  },
  {
    id: 'subvention',
    label: 'Grants',
    labelFr: 'Subventions',
    emoji: '🎁',
    color: '#22c55e',
    description: 'Programmes de subventions et aides financières',
  },
  {
    id: 'legal',
    label: 'Legal',
    labelFr: 'Légal',
    emoji: '⚖️',
    color: '#f59e0b',
    description: 'Obligations légales et réglementaires',
  },
  {
    id: 'event',
    label: 'Events',
    labelFr: 'Événements',
    emoji: '📅',
    color: '#8b5cf6',
    description: 'Salons, formations et événements business',
  },
];

/**
 * Charger toutes les données du calendrier
 */
export function getCalendarData(): CalendarData {
  return eventsData as CalendarData;
}

/**
 * Charger tous les événements
 */
export function getAllEvents(): CalendarEvent[] {
  return getCalendarData().events;
}

/**
 * Filtrer les événements par catégorie
 */
export function getEventsByCategory(category: EventCategory): CalendarEvent[] {
  return getAllEvents().filter((event) => event.category === category);
}

/**
 * Obtenir les événements d'un mois donné
 */
export function getEventsByMonth(year: number, month: number): CalendarEvent[] {
  return getAllEvents().filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

/**
 * Obtenir les prochains événements
 */
export function getUpcomingEvents(limit: number = 5): CalendarEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return getAllEvents()
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

/**
 * Obtenir un événement par son ID
 */
export function getEventById(id: string): CalendarEvent | undefined {
  return getAllEvents().find((event) => event.id === id);
}

/**
 * Obtenir les métadonnées d'une catégorie
 */
export function getCategoryMeta(category: EventCategory): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === category);
}

/**
 * Formater une date en français
 */
export function formatDateFr(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculer le nombre de jours restants
 */
export function getDaysUntil(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateString);
  const diffTime = eventDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
