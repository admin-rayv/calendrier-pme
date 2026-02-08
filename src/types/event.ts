/**
 * Catégories d'événements du calendrier PME
 */
export type EventCategory = 'fiscal' | 'subvention' | 'legal' | 'event' | 'emploi';

/**
 * Fréquence de récurrence
 */
export type RecurrenceType = 'once' | 'monthly' | 'quarterly' | 'annual';

/**
 * Événement du calendrier
 */
export interface CalendarEvent {
  /** Identifiant unique */
  id: string;
  
  /** Titre de l'événement */
  title: string;
  
  /** Description détaillée */
  description: string;
  
  /** Date de l'échéance (ISO 8601: YYYY-MM-DD) */
  date: string;
  
  /** Catégorie */
  category: EventCategory;
  
  /** Type de récurrence */
  recurrence: RecurrenceType;
  
  /** URL source officielle */
  sourceUrl?: string;
  
  /** Organisation responsable (ex: Revenu Québec, ARC) */
  organization?: string;
  
  /** Tags additionnels pour filtrage */
  tags?: string[];
  
  /** Applicable à quels types d'entreprises */
  applicableTo?: ('incorporated' | 'sole-proprietor' | 'partnership' | 'all')[];
  
  /** Priorité (pour tri) */
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Métadonnées des catégories
 */
export interface CategoryMeta {
  id: EventCategory;
  label: string;
  labelFr: string;
  emoji: string;
  color: string;
  description: string;
}

/**
 * Données complètes du calendrier
 */
export interface CalendarData {
  version: string;
  lastUpdated: string;
  events: CalendarEvent[];
}
