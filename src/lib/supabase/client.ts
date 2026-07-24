import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

/**
 * ============================================================================
 * SUPABASE BROWSER CLIENT
 * 
 * PURPOSE:
 * Initializes the client-side Supabase instance using environment variables.
 * Safe to import and use across React components and client pages.
 * ============================================================================
 */

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://igesdedhfvhjmplmbtvx.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_il6e134lO1G-mlUWKnfXUw_fQZ5r4f2";

/**
 * Check whether Supabase environment variables are configured.
 */
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("your-supabase-project-id") &&
    !supabaseAnonKey.includes("your-anon-key-here")
  );
};

/**
 * Browser Supabase Singleton Client Instance
 */
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;
