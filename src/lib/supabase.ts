import { AdminSettings } from '@/types';

// =====================================================
// MOCK SUPABASE CLIENT — Uses localStorage
// =====================================================
// To connect to real Supabase:
// 1. pnpm add @supabase/supabase-js
// 2. Replace this file with:
//    import { createClient } from '@supabase/supabase-js';
//    export const supabase = createClient(URL, ANON_KEY);
// 3. Create tables matching the Guest and AdminSettings types
// =====================================================

const SETTINGS_KEY = 'wedding_admin_settings';

const DEFAULT_SETTINGS: AdminSettings = {
  heroPhotoUrl: '',
  secondaryPhotoUrl: '',
  giftListUrl: '',
};

export function getAdminSettings(): AdminSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  return JSON.parse(stored);
}

export function saveAdminSettings(settings: AdminSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
