import { CalendarEvent } from '@/types/event';

/**
 * Generate calendar links for various providers
 */

function formatDateForGoogle(date: string): string {
  // Format: YYYYMMDD (all-day event)
  return date.replace(/-/g, '');
}

function formatDateForICS(date: string): string {
  // Format: YYYYMMDD for all-day events
  return date.replace(/-/g, '');
}

function getNextDay(date: string): string {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0].replace(/-/g, '');
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const startDate = formatDateForGoogle(event.date);
  const endDate = getNextDay(event.date); // All-day event ends next day
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description + (event.sourceUrl ? `\n\nSource: ${event.sourceUrl}` : ''),
    location: event.organization || '',
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(event: CalendarEvent): string {
  const startDate = event.date;
  const endDate = new Date(event.date);
  endDate.setDate(endDate.getDate() + 1);
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: startDate,
    enddt: endDateStr,
    body: event.description + (event.sourceUrl ? `\n\nSource: ${event.sourceUrl}` : ''),
    location: event.organization || '',
    allday: 'true',
  });
  
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function getOutlook365CalendarUrl(event: CalendarEvent): string {
  const startDate = event.date;
  const endDate = new Date(event.date);
  endDate.setDate(endDate.getDate() + 1);
  const endDateStr = endDate.toISOString().split('T')[0];
  
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: startDate,
    enddt: endDateStr,
    body: event.description + (event.sourceUrl ? `\n\nSource: ${event.sourceUrl}` : ''),
    location: event.organization || '',
    allday: 'true',
  });
  
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function generateICSContent(event: CalendarEvent): string {
  const startDate = formatDateForICS(event.date);
  const endDate = getNextDay(event.date);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Calendrier PME Québec//calendrierpme.ca//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@calendrierpme.ca`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDate}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}${event.sourceUrl ? '\\n\\nSource: ' + event.sourceUrl : ''}`,
    event.organization ? `LOCATION:${escapeICS(event.organization)}` : '',
    `URL:${event.sourceUrl || 'https://calendrierpme.ca'}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
  
  return icsContent;
}

export function downloadICS(event: CalendarEvent): void {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-zA-Z0-9àâäéèêëïîôùûüç\s-]/gi, '').replace(/\s+/g, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
