import { Guest, EventType } from '@/types';
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

export async function findGuest(name: string): Promise<Guest | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('guests')
    .select('*');

  if (error || !data) return null;

  const normalized = normalizeString(name);
  const found = data.find(g => normalizeString(g.full_name) === normalized);
  
  return found ? mapDbGuestToGuest(found) : null;
}

export async function confirmAttendance(
  guestId: string,
  events: EventType[],
  companion?: string
): Promise<Guest | null> {
  if (!supabase) return null;
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

  if (error || !data) return null;

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
