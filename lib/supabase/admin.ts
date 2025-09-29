// lib/supabase/admin.ts
import 'server-only';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !serviceKey) {
  console.warn('[adminClient] Missing SUPABASE env vars. Admin dashboard will not work.');
}

export const adminClient = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Back-compat: old code imports { supabaseAdmin }
export const supabaseAdmin = adminClient;

export type AdminClient = typeof adminClient;
