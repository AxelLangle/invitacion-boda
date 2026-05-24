import { Guest, EventType } from '@/types';

const STORAGE_KEY = 'wedding_guests';

// Pre-defined guest list
const INITIAL_GUESTS: Guest[] = [
  { id: '1', fullName: 'Juan Pérez', plusOne: true, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '2', fullName: 'María López', plusOne: false, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '3', fullName: 'Carlos García', plusOne: true, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '4', fullName: 'Ana Martínez', plusOne: false, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '5', fullName: 'Roberto Hernández', plusOne: true, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '6', fullName: 'Laura Sánchez', plusOne: false, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '7', fullName: 'Diego Ramírez', plusOne: true, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '8', fullName: 'Sofía Torres', plusOne: false, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '9', fullName: 'Fernando Díaz', plusOne: true, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
  { id: '10', fullName: 'Valentina Flores', plusOne: false, companion: '', attendingEvents: [], confirmed: false, confirmedAt: '' },
];

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function initGuests(): Guest[] {
  if (typeof window === 'undefined') return INITIAL_GUESTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GUESTS));
    return INITIAL_GUESTS;
  }
  return JSON.parse(stored);
}

export function getAllGuests(): Guest[] {
  return initGuests();
}

export function findGuest(name: string): Guest | null {
  const guests = initGuests();
  const normalized = normalizeString(name);
  return guests.find(g => normalizeString(g.fullName) === normalized) || null;
}

export function confirmAttendance(
  guestId: string,
  events: EventType[],
  companion?: string
): Guest | null {
  const guests = initGuests();
  const index = guests.findIndex(g => g.id === guestId);
  if (index === -1) return null;

  guests[index] = {
    ...guests[index],
    confirmed: true,
    attendingEvents: events,
    companion: companion || '',
    confirmedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
  }
  return guests[index];
}

export function getConfirmedGuests(): Guest[] {
  return initGuests().filter(g => g.confirmed);
}

export function getGuestStats() {
  const guests = initGuests();
  return {
    total: guests.length,
    confirmed: guests.filter(g => g.confirmed).length,
    pending: guests.filter(g => !g.confirmed).length,
  };
}
