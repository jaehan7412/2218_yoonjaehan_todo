import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!supabaseAnonKey) missingVars.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
    
    throw new Error(
      `Missing Supabase environment variables: ${missingVars.join(", ")}. ` +
      `Please set them in Vercel Dashboard → Settings → Environment Variables and redeploy.`
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

