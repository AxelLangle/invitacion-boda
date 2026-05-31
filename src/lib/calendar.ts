export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Boda de Axel & Nahomi',
    dates: '20260804T173000Z/20260805T110000Z',
    details: '¡Te esperamos para celebrar nuestra boda!',
    location: '19°48\'12.7"N 99°03\'36.1"W',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(): string {
  const params = new URLSearchParams({
    rru: 'addevent',
    startdt: '2026-08-04T17:30:00Z',
    enddt: '2026-08-05T11:00:00Z',
    subject: 'Boda de Axel & Nahomi',
    body: '¡Te esperamos para celebrar nuestra boda!',
    location: '19°48\'12.7"N 99°03\'36.1"W',
    path: '/calendar/action/compose',
  });

  return `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`;
}

export function getAppleCalendarUrl(): string {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BodaAxelNahomi//Invitacion//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:boda-axel-nahomi-2026@invitacion`,
    `DTSTAMP:20260531T000000Z`,
    'DTSTART:20260804T173000Z',
    'DTEND:20260805T110000Z',
    'SUMMARY:Boda de Axel & Nahomi',
    'DESCRIPTION:¡Te esperamos para celebrar nuestra boda!',
    `LOCATION:19°48'12.7"N 99°03'36.1"W`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
