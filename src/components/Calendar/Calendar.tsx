'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { CalendarEvent, EventCategory } from '@/types/event';
import { getAllEvents, getCategoryMeta, formatDateFr, getDaysUntil } from '@/lib/events';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const STORAGE_KEY = 'calendrierpme-filters';
const ALL_CATEGORIES: EventCategory[] = ['fiscal', 'subvention', 'legal', 'event', 'emploi'];

interface CalendarProps {
  initialYear?: number;
  initialMonth?: number;
}

export function Calendar({ initialYear, initialMonth }: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(initialYear ?? today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [activeCategories, setActiveCategories] = useState<Set<EventCategory>>(() => {
    // Initialize with saved categories or all categories
    if (typeof window === 'undefined') return new Set(ALL_CATEGORIES);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as EventCategory[];
        return new Set(parsed.filter(c => ALL_CATEGORIES.includes(c)));
      }
    } catch {
      // Ignore errors
    }
    return new Set(ALL_CATEGORIES);
  });

  // Save categories to localStorage when they change
  const saveCategories = useCallback((categories: Set<EventCategory>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...categories]));
    }
  }, []);

  useEffect(() => {
    saveCategories(activeCategories);
  }, [activeCategories, saveCategories]);

  const allEvents = getAllEvents();

  // Filter events by active categories
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => activeCategories.has(event.category));
  }, [allEvents, activeCategories]);

  // Get events for current month
  const monthEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth;
    });
  }, [filteredEvents, currentYear, currentMonth]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    monthEvents.forEach(event => {
      const day = new Date(event.date).getDate();
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(event);
    });
    return map;
  }, [monthEvents]);

  // Calendar grid calculation
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Empty cells before first day
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  }, [currentYear, currentMonth]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const toggleCategory = (category: EventCategory) => {
    const newCategories = new Set(activeCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setActiveCategories(newCategories);
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['fiscal', 'subvention', 'legal', 'emploi', 'event'] as EventCategory[]).map(category => {
          const meta = getCategoryMeta(category);
          const isActive = activeCategories.has(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2 ${
                isActive
                  ? 'opacity-100'
                  : 'opacity-50 hover:opacity-75 border-transparent'
              }`}
              style={{
                backgroundColor: isActive ? meta?.color + '20' : '#f3f4f6',
                color: isActive ? meta?.color : '#6b7280',
                borderColor: isActive ? meta?.color : 'transparent',
              }}
            >
              {meta?.emoji} {meta?.labelFr}
            </button>
          );
        })}
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={goToPreviousMonth}>
          ← Précédent
        </Button>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={goToToday}
            className="text-sm text-primary-600 hover:underline"
          >
            Aujourd&apos;hui
          </button>
        </div>
        <Button variant="secondary" onClick={goToNextMonth}>
          Suivant →
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {DAYS.map(day => (
            <div key={day} className="py-3 text-center text-sm font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayEvents = day ? eventsByDay.get(day) || [] : [];
            return (
              <div
                key={index}
                className={`min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border-b border-r border-gray-100 ${
                  day === null ? 'bg-gray-50' : 'bg-white'
                } ${isToday(day!) ? 'bg-primary-50' : ''}`}
              >
                {day !== null && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-primary-600 font-bold' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => {
                        const meta = getCategoryMeta(event.category);
                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full text-left px-1.5 py-0.5 rounded text-xs truncate hover:opacity-80 transition-opacity"
                            style={{
                              backgroundColor: meta?.color + '20',
                              color: meta?.color,
                            }}
                            title={event.title}
                          >
                            {event.title}
                          </button>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 px-1">
                          +{dayEvents.length - 3} autres
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Count */}
      <p className="text-center text-sm text-gray-500">
        {monthEvents.length} événement{monthEvents.length !== 1 ? 's' : ''} ce mois
      </p>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <Card 
            className="max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <Badge category={selectedEvent.category} />
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-primary-600 font-medium mb-4">
              📅 {formatDateFr(selectedEvent.date)}
              <span className="text-gray-500 ml-2">
                ({getDaysUntil(selectedEvent.date) >= 0 
                  ? `dans ${getDaysUntil(selectedEvent.date)} jours` 
                  : 'Passé'})
              </span>
            </p>
            <p className="text-gray-600 mb-4">
              {selectedEvent.description}
            </p>
            {selectedEvent.organization && (
              <p className="text-sm text-gray-500 mb-2">
                <strong>Organisation:</strong> {selectedEvent.organization}
              </p>
            )}
            {selectedEvent.sourceUrl && (
              <a
                href={selectedEvent.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary-600 hover:underline"
              >
                🔗 Source officielle →
              </a>
            )}
            {selectedEvent.tags && selectedEvent.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
