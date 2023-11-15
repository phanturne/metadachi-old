// Source: https://github.com/JeaneC/tauri-oauth-supabase/blob/main/src/supabaseClient.tsx

import { createClient as createBrowserClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createTauriClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: 'CustomApp',
      // storage: window?.localStorage,
      flowType: 'pkce',
    },
  });
