'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { CalendarEvent, EventCategory } from '@/types/event';
import { getAllEvents, getCategoryMeta, formatDateFr, getDaysUntil } from '@/lib/events';
import { Badge } from '@/components/ui/Badge';
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

      {/* Calendar Grid - Bento Style */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-[#D1E8E2]/50 to-[#A9D6E5]/30">
          {DAYS.map(day => (
            <div key={day} className="py-4 text-center text-sm font-semibold text-[#19747E]">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayEvents = day ? eventsByDay.get(day) || [] : [];
            const hasEvents = dayEvents.length > 0;
            return (
              <div
                key={index}
                className={`min-h-[100px] sm:min-h-[120px] p-2 sm:p-3 border-t-2 border-l-2 border-gray-100 transition-colors duration-150 ${
                  day === null ? 'bg-gray-50/50' : hasEvents ? 'bg-white hover:bg-[#D1E8E2]/20' : 'bg-white'
                } ${isToday(day!) ? 'bg-[#D1E8E2]/40 ring-2 ring-inset ring-[#19747E]/30' : ''}`}
              >
                {day !== null && (
                  <>
                    <div className={`text-sm font-semibold mb-2 ${
                      isToday(day) ? 'text-[#19747E] text-base' : 'text-gray-600'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1.5">
                      {dayEvents.slice(0, 3).map(event => {
                        const meta = getCategoryMeta(event.category);
                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="w-full text-left px-2 py-1 rounded-lg text-xs font-medium truncate transition-all duration-150 hover:scale-[1.02] border"
                            style={{
                              backgroundColor: meta?.color + '15',
                              borderColor: meta?.color + '40',
                              color: meta?.color,
                            }}
                            title={event.title}
                          >
                            {event.title}
                          </button>
                        );
                      })}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-[#19747E] font-medium px-1">
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

      {/* Event Detail Modal - Bento Style */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-3xl border-2 border-gray-200 p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <Badge category={selectedEvent.category} />
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center text-xl transition-colors"
              >
                ×
              </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {selectedEvent.title}
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D1E8E2]/50 mb-6">
              <span className="text-[#19747E] font-semibold">
                📅 {formatDateFr(selectedEvent.date)}
              </span>
              <span className="text-[#19747E]/70 text-sm">
                ({getDaysUntil(selectedEvent.date) >= 0 
                  ? `dans ${getDaysUntil(selectedEvent.date)} jours` 
                  : 'Passé'})
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedEvent.description}
            </p>
            {selectedEvent.organization && (
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-semibold text-gray-700">Organisation:</span> {selectedEvent.organization}
              </p>
            )}
            {selectedEvent.sourceUrl && (
              <a
                href={selectedEvent.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19747E]/10 text-[#19747E] font-medium text-sm hover:bg-[#19747E]/20 transition-colors"
              >
                🔗 Source officielle →
              </a>
            )}
            {selectedEvent.tags && selectedEvent.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
