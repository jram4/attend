// lib/supabase/admin.ts

import { createClient } from '@supabase/supabase-js';

// This is a privileged client for server-side admin tasks.
// It uses the SERVICE_ROLE_KEY and bypasses RLS.
//
// DO NOT USE THIS ON THE CLIENT SIDE.
// DO NOT USE THIS FOR USER-SPECIFIC OPERATIONS.

// Validate that the required environment variables are set.
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase URL or Service Role Key is not set in environment variables.");
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      // It's good practice to disable auto-refreshing sessions for an admin client
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
