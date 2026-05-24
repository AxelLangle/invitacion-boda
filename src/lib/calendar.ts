export function generateICS(): string {
  // Wedding: August 4, 2026, 11:30 AM Mexico City time (UTC-6 = 17:30 UTC)
  // End: August 5, 2026, 05:00 AM Mexico City time (UTC-6 = 11:00 UTC)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BodaAxelNahomi//Invitacion//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:boda-axel-nahomi-2026@invitacion`,
    `DTSTAMP:${formatDateUTC(new Date())}`,
    'DTSTART:20260804T173000Z',
    'DTEND:20260805T110000Z',
    'SUMMARY:Boda de Axel & Nahomi',
    'DESCRIPTION:¡Te esperamos para celebrar nuestra boda!',
    `LOCATION:19°48'12.7"N 99°03'36.1"W`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function formatDateUTC(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function downloadICS(): void {
  const icsContent = generateICS();
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'boda-axel-nahomi.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
