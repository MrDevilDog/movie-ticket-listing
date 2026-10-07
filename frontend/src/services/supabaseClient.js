import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment or localStorage override
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let cachedClient = null;

export function getSupabaseConfig() {
  const localUrl = localStorage.getItem('showticket_sb_url') || '';
  const localKey = localStorage.getItem('showticket_sb_key') || '';

  return {
    url: localUrl || envUrl || '',
    key: localKey || envKey || ''
  };
}

export function saveSupabaseConfig(url, key) {
  if (url) localStorage.setItem('showticket_sb_url', url.trim());
  else localStorage.removeItem('showticket_sb_url');

  if (key) localStorage.setItem('showticket_sb_key', key.trim());
  else localStorage.removeItem('showticket_sb_key');

  cachedClient = null; // Reset cached client
}

export function getSupabaseClient() {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return null;
  }

  if (!cachedClient) {
    try {
      cachedClient = createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return cachedClient;
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key && url.includes('supabase.co'));
}

export async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase URL or Anon Key is missing.' };
  }

  try {
    const { data, error } = await client.from('movies').select('id').limit(1);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, count: data ? data.length : 0 };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
