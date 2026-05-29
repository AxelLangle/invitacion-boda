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
