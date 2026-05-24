import { createClient } from '@supabase/supabase-js';
import { AdminSettings } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_SETTINGS: AdminSettings = {
  heroPhotoUrl: '',
  secondaryPhotoUrl: '',
  giftListUrl: '',
};

export async function getAdminSettings(): Promise<AdminSettings> {
  try {
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
    };
  } catch (error) {
    console.error("Error fetching settings", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveAdminSettings(settings: AdminSettings): Promise<void> {
  try {
    await supabase
      .from('admin_settings')
      .upsert({
        id: 1,
        hero_photo_url: settings.heroPhotoUrl,
        secondary_photo_url: settings.secondaryPhotoUrl,
        gift_list_url: settings.giftListUrl
      });
  } catch (error) {
    console.error("Error saving settings", error);
  }
}
