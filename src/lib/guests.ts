import { Guest, EventType } from '@/types';

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
import { supabase } from './supabase';

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export async function getAllGuests(): Promise<Guest[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('full_name', { ascending: true });

  if (error || !data) return [];

  return data.map(mapDbGuestToGuest);
}

export async function searchGuests(query: string): Promise<Guest[]> {
  if (!supabase) {
    throw new NetworkError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
  }

  const normalizedQueryWords = normalizeString(query)
    .split(' ')
    .filter((w) => w.length > 0);

  if (normalizedQueryWords.length === 0) return [];

  // Fetch only necessary columns to reduce data transfer.
  // Client-side filtering with normalizeString handles accent-insensitive matching
  // (e.g. "ordonez" matches "Ordoñez"), which PostgreSQL ilike cannot do.
  const { data, error } = await supabase
    .from('guests')
    .select('id, full_name, plus_one, companion, confirmed, confirmed_at, attending_events');

  if (error) {
    throw new NetworkError('Error al buscar invitados. Intenta de nuevo en unos segundos.');
  }

  if (!data) return [];

  const matched = data.filter((g) => {
    const normalizedName = normalizeString(g.full_name);
    return normalizedQueryWords.every((word) => normalizedName.includes(word));
  });

  return matched.map(mapDbGuestToGuest);
}

export async function confirmAttendance(
  guestId: string,
  events: EventType[],
  companion?: string
): Promise<Guest> {
  if (!supabase) {
    throw new NetworkError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
  }

  const { data, error } = await supabase
    .from('guests')
    .update({
      confirmed: true,
      attending_events: events,
      companion: companion || '',
      confirmed_at: new Date().toISOString()
    })
    .eq('id', guestId)
    .select()
    .single();

  if (error) {
    throw new NetworkError('No se pudo confirmar tu asistencia. Intenta de nuevo.');
  }

  if (!data) {
    throw new NetworkError('No se recibió confirmación del servidor. Intenta de nuevo.');
  }

  return mapDbGuestToGuest(data);
}

export async function getConfirmedGuests(): Promise<Guest[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('confirmed', true);

  if (error || !data) return [];

  return data.map(mapDbGuestToGuest);
}

export async function getGuestStats() {
  if (!supabase) return { total: 0, confirmed: 0, pending: 0 };
  const { data, error } = await supabase.from('guests').select('*');
  
  if (error || !data) {
    return { total: 0, confirmed: 0, pending: 0 };
  }

  return {
    total: data.length,
    confirmed: data.filter(g => g.confirmed).length,
    pending: data.filter(g => !g.confirmed).length,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbGuestToGuest(row: any): Guest {
  return {
    id: row.id,
    fullName: row.full_name,
    plusOne: row.plus_one,
    companion: row.companion || '',
    attendingEvents: row.attending_events || [],
    confirmed: row.confirmed,
    confirmedAt: row.confirmed_at || '',
  };
}
