import { createClient } from '@supabase/supabase-js';
import { AdminSettings } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseKey);
}

export const supabase = getSupabaseClient();

const DEFAULT_SETTINGS: AdminSettings = {
  heroPhotoUrl: '',
  secondaryPhotoUrl: '',
  giftListUrl: '',
  bgTextureUrl: '',
  envelopeClosedUrl: '',
  envelopeOpenUrl: '',
};

export async function getAdminSettings(): Promise<AdminSettings> {
  try {
    if (!supabase) return DEFAULT_SETTINGS;
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('id', 1)
      .single();
      
    if (error || !data) return DEFAULT_SETTINGS;
    
    return {
      heroPhotoUrl: data.hero_photo_url || '',
      secondaryPhotoUrl: data.secondary_photo_url || '',
      giftListUrl: data.gift_list_url || '',
      bgTextureUrl: data.bg_texture_url || '',
      envelopeClosedUrl: data.envelope_closed_url || '',
      envelopeOpenUrl: data.envelope_open_url || '',
    };
  } catch (error) {
    console.error("Error fetching settings", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveAdminSettings(settings: AdminSettings): Promise<void> {
  try {
    if (!supabase) return;
    await supabase
      .from('admin_settings')
      .upsert({
        id: 1,
        hero_photo_url: settings.heroPhotoUrl,
        secondary_photo_url: settings.secondaryPhotoUrl,
        gift_list_url: settings.giftListUrl,
        bg_texture_url: settings.bgTextureUrl,
        envelope_closed_url: settings.envelopeClosedUrl,
        envelope_open_url: settings.envelopeOpenUrl
      });
  } catch (error) {
    console.error("Error saving settings", error);
  }
}
