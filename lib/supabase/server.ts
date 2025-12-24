import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import "server-only";

export async function createClient() {
  const cookieStoreResult = await cookies();
  
  // 타입 단언을 사용하여 TypeScript가 타입을 올바르게 인식하도록 함
  type CookieStore = {
    getAll(): Array<{ name: string; value: string }>;
    set(name: string, value: string, options?: { path?: string; maxAge?: number; domain?: string; sameSite?: 'strict' | 'lax' | 'none'; secure?: boolean; httpOnly?: boolean }): void;
  };
  
  // 타입 단언을 더 명확하게 적용
  const cookieStore: CookieStore = cookieStoreResult as unknown as CookieStore;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  // 타입 단언을 통해 메서드를 직접 참조
  const getAllFn: () => Array<{ name: string; value: string }> = () => {
    return (cookieStoreResult as any).getAll();
  };
  
  const setFn: (name: string, value: string, options?: any) => void = (name, value, options) => {
    try {
      (cookieStoreResult as any).set(name, value, options);
    } catch {
      // The `setAll` method was called from a Server Component.
      // This can be ignored if you have middleware refreshing
      // user sessions.
    }
  };

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: getAllFn,
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            setFn(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

